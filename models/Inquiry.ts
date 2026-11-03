import { Schema, model, models, type Model, type InferSchemaType } from 'mongoose'

const InquirySchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 120 },
    email: { type: String, required: true, maxlength: 200 },
    category: { type: String, required: true, maxlength: 80, index: true },
    message: { type: String, required: true, maxlength: 5000 },
    status: { type: String, enum: ['new', 'read', 'archived'], default: 'new', index: true },
  },
  { timestamps: true },
)
InquirySchema.index({ createdAt: -1 })

export type InquiryDoc = InferSchemaType<typeof InquirySchema>
export const Inquiry: Model<InquiryDoc> = (models.Inquiry as Model<InquiryDoc>) || model<InquiryDoc>('Inquiry', InquirySchema)
