export type MediaModules = Readonly<Record<string, string>>;

const fileNameCollator = new Intl.Collator('es', { numeric: true, sensitivity: 'base' });
const NUMBERED_FILE = /^\d+$/;

function baseName(path: string): string {
  const fileName = path.slice(path.lastIndexOf('/') + 1);
  return fileName.replace(/\.[^.]+$/, '');
}

function pathsInFolder(modules: MediaModules, root: string, folder: string): string[] {
  const prefix = `../${root}/${folder}/`;
  return Object.keys(modules)
    .filter((path) => path.startsWith(prefix))
    .sort(fileNameCollator.compare);
}

export function numberedUrls(modules: MediaModules, root: string, folder: string): string[] {
  return pathsInFolder(modules, root, folder)
    .filter((path) => NUMBERED_FILE.test(baseName(path)))
    .map((path) => modules[path]!);
}

export function namedUrl(modules: MediaModules, root: string, folder: string, name: string): string | undefined {
  const match = pathsInFolder(modules, root, folder).find((path) => baseName(path).toLowerCase() === name.toLowerCase());
  return match ? modules[match] : undefined;
}

export function firstNamedUrl(modules: MediaModules, root: string, folder: string, names: readonly string[]): string | undefined {
  for (const name of names) {
    const url = namedUrl(modules, root, folder, name);
    if (url) return url;
  }
  return undefined;
}

export function firstUrl(modules: MediaModules, root: string, folder: string): string | undefined {
  const [first] = pathsInFolder(modules, root, folder);
  return first ? modules[first] : undefined;
}
