const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

interface CreatePostResponse {
  id: number
  title: string
  directory_name: string
  message: string
}

export async function createPost(
  title: string,
  zipFile: File,
  token: string
): Promise<CreatePostResponse> {
  const formData = new FormData()
  formData.append("title", title)
  formData.append("zip_file", zipFile)

  const response = await fetch(`${API_BASE_URL}/create-post`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to create post")
  }

  return response.json()
}
