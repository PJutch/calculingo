export default function useIcon(name: string): string {
    const basePath = import.meta.env.VITE_BASE_URL;
    const noTralingSlash = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
    return `${noTralingSlash}/icons/${name}`
}
