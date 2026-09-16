import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const BANNED_MODULES = [
  'BackgroundSystem',
  'ClientHome',
  'TopNav',
  'ProjectDisplay',
  'TechnicalSpecs',
  'ProjectDetailDrawer',
  'ContactHUD',
  'HUDSystemAlert',
  'HUDErrorBoundary',
  'useHUDStore',
  'useMagneticHUD',
  'useTextDecodeEffect',
];

const BANNED_HUD_CLASSES = [
  'detail-drawer',
  'drawer-content',
  'noise-overlay',
  'status-bar',
  'hud-alert',
  'hud-error-boundary',
];

function getFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else if (/\.(tsx?|jsx?)$/.test(file)) {
      results.push(filePath);
    }
  }
  return results;
}

describe('Route Isolation: /client routes audit', () => {
  const clientDir = path.resolve(process.cwd(), 'src/app/client');
  const clientFiles = getFilesRecursively(clientDir);

  it('should find /client route files to audit', () => {
    expect(clientFiles.length).toBeGreaterThan(0);
  });

  clientFiles.forEach((filePath) => {
    const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

    describe(`File: ${relativePath}`, () => {
      const content = fs.readFileSync(filePath, 'utf-8');

      BANNED_MODULES.forEach((bannedModule) => {
        it(`must not import or reference banned HUD module "${bannedModule}"`, () => {
          // Check import statements specifically
          const importRegex = new RegExp(
            `import\\s+.*\\b${bannedModule}\\b.*from`,
            'i'
          );
          expect(importRegex.test(content)).toBe(false);

          // Also ensure the identifier does not appear anywhere in imports or JSX
          const wordRegex = new RegExp(`\\b${bannedModule}\\b`);
          expect(wordRegex.test(content)).toBe(false);
        });
      });

      BANNED_HUD_CLASSES.forEach((bannedClass) => {
        it(`must not use HUD-specific class "${bannedClass}"`, () => {
          expect(content.includes(bannedClass)).toBe(false);
        });
      });
    });
  });
});
