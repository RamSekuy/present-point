import { BASE_API_URL } from "@/config/config";

export function imgURL(id?: string) {
  if (!id) return "/img/defaultAvatar.webp";
  return new URL(BASE_API_URL + "/image/" + id).toString();
}
