"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { toggleAdminSection } from "@/lib/features/userSlice"
import { createPost } from "@/lib/api/blog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import LoadingOverlay from "@/components/LoadingOverlay"
import Modal from "@/components/ui/modal"
import ModalInformationOk from "@/components/ui/modal/ModalInformationOk"

const uploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  zipFile: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "ZIP file is required")
    .refine(
      (files) => files[0]?.type === "application/zip" || files[0]?.type === "application/x-zip-compressed",
      "Only .zip files are allowed"
    ),
})

type UploadFormData = z.infer<typeof uploadSchema>

export default function AdminPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.token)
  const adminSections = useAppSelector((state) => state.user.adminSections)
  const [isLoading, setIsLoading] = useState(false)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: "success" | "error"
    title: string
    message: string
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  })

  const isUploadOpen = adminSections["upload-blog"] || false

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  })

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token) {
      router.push("/login")
    }
  }, [token, router])

  // Show nothing while checking auth or redirecting
  if (!token) {
    return null
  }

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      type: "success",
      title: "",
      message: "",
    })
  }

  const onSubmit = async (data: UploadFormData) => {
    setIsLoading(true)

    try {
      const file = data.zipFile[0]
      await createPost(data.title, file, token)

      setModalState({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "Blog post created successfully!",
      })
      reset()
    } catch (err) {
      setModalState({
        isOpen: true,
        type: "error",
        title: "Error",
        message: err instanceof Error ? err.message : "Failed to create post",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl font-mono font-bold mb-6">Admin Dashboard</h1>

          {/* Upload Blog Markdown Section */}
          <Collapsible
            open={isUploadOpen}
            onOpenChange={() => dispatch(toggleAdminSection("upload-blog"))}
            className="border-2 border-black rounded-lg"
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <h2 className="text-xl font-mono font-bold">Upload Blog Markdown</h2>
                {isUploadOpen ? (
                  <ChevronDown className="h-6 w-6" />
                ) : (
                  <ChevronRight className="h-6 w-6" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="border-t-2 border-black p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-mono">
                      Title
                    </Label>
                    <Input
                      id="title"
                      {...register("title")}
                      className="font-mono"
                      disabled={isLoading}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600 font-mono">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipFile" className="font-mono">
                      ZIP File
                    </Label>
                    <Input
                      id="zipFile"
                      type="file"
                      accept=".zip"
                      {...register("zipFile")}
                      className="font-mono"
                      disabled={isLoading}
                    />
                    {errors.zipFile && (
                      <p className="text-sm text-red-600 font-mono">
                        {errors.zipFile.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="font-mono" disabled={isLoading}>
                    Submit
                  </Button>
                </form>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* Modal for success/error messages */}
      <Modal isOpen={modalState.isOpen} onClose={handleCloseModal}>
        <ModalInformationOk
          title={modalState.title}
          message={modalState.message}
          variant={modalState.type}
          onClose={handleCloseModal}
        />
      </Modal>
    </>
  )
}
