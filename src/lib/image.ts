const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

const DEFAULT_IMAGE = "/images/no-image.svg";
const DEFAULT_USER = "/images/no-user.svg";

export function resolveImageUrl(
  path?: string | null,
  folder?: string,
  isUser: boolean = false
): string {
  // ✅ fallback if empty
  if (!path) {
    return isUser ? DEFAULT_USER : DEFAULT_IMAGE;
  }

  // ✅ already full URL
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  // ✅ normalize values
  const cleanPath = path.replace(/^\/+/, "");
  const cleanFolder = folder
    ? folder.replace(/^\/|\/$/g, "")
    : "";

  // ✅ if path already contains "storage", don't duplicate
  if (cleanPath.startsWith("storage/")) {
    return `${BACKEND_URL}/${cleanPath}`;
  }

  // ✅ build final URL
  let finalPath = `${BACKEND_URL}`;

  if (cleanFolder) {
    finalPath += `/storage/${cleanFolder}/${cleanPath}`;
  } else {
    finalPath += `/storage/${cleanPath}`;
  }

  return finalPath;
}