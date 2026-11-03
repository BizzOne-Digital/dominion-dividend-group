import { Schema, model, models, type Model, type InferSchemaType } from 'mongoose'

const BusinessModelSectionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'landmark' },
    imageUrl: { type: String, default: '' },
    bullets: { type: [String], default: [] },
    order: { type: Number, default: 0, index: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export type BusinessModelSectionDoc = InferSchemaType<typeof BusinessModelSectionSchema>
export const BusinessModelSection: Model<BusinessModelSectionDoc> =
  (models.BusinessModelSection as Model<BusinessModelSectionDoc>) ||
  model<BusinessModelSectionDoc>('BusinessModelSection', BusinessModelSectionSchema)
