'use client'

import { useCallback, useEffect, useState } from 'react'
import { useToast } from './Toast'

/** Load + save an admin-editable document from an admin API endpoint. */
export function useContentEditor<T>(endpoint: string) {
  const toast = useToast()
  const [data, setData] = useState<T | null>(null)
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(endpoint, { cache: 'no-store' })
      .then(async (r) => {
        const json = await r.json().catch(() => ({}))
        if (!r.ok) throw new Error(json.error || 'Unable to load content.')
        if (!cancelled) setData(json.data as T)
      })
      .catch((e: Error) => !cancelled && setLoadError(e.message))
    return () => {
      cancelled = true
    }
  }, [endpoint])

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const update = useCallback((patch: Partial<T>) => {
    setData((d) => (d ? { ...d, ...patch } : d))
    setDirty(true)
  }, [])

  const replace = useCallback((next: T) => {
    setData(next)
    setDirty(true)
  }, [])

  const save = useCallback(
    async (override?: T): Promise<boolean> => {
      const payload = override ?? data
      if (!payload || saving) return false
      setSaving(true)
      try {
        const res = await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: payload }),
        })
        const json = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(json.error || 'Unable to save content.')
        if (override) setData(override)
        setDirty(false)
        toast.success('Changes saved successfully.')
        return true
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Unable to save content.')
        return false
      } finally {
        setSaving(false)
      }
    },
    [data, endpoint, saving, toast],
  )

  return { data, loadError, saving, dirty, update, replace, save }
}
