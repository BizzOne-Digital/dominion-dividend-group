import { Schema, model, models, type Model, type InferSchemaType } from 'mongoose'

const StoredUploadSchema = new Schema(
  {
    folder: { type: String, required: true, index: true },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true },
)

StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true })

export type StoredUploadDoc = InferSchemaType<typeof StoredUploadSchema>
export const StoredUpload: Model<StoredUploadDoc> =
  (models.StoredUpload as Model<StoredUploadDoc>) || model<StoredUploadDoc>('StoredUpload', StoredUploadSchema)
