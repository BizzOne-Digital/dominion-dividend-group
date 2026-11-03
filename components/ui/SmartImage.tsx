import Image, { type ImageProps } from 'next/image'
import { normalizeImageUrl } from '@/lib/utils'

/** next/image wrapper: normalises legacy URLs and serves SVG placeholders unoptimised. */
export function SmartImage({ src, alt, ...rest }: Omit<ImageProps, 'src'> & { src?: string | null }) {
  const url = normalizeImageUrl(src)
  return <Image src={url} alt={alt} unoptimized={url.endsWith('.svg')} {...rest} />
}
