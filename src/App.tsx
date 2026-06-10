import { useMemo, useState } from 'react'
import type { LabelItem, LabelSettings } from './types'
import { PRESETS } from './types'
import FieldEditor from './components/FieldEditor'
import LabelSettingsPanel from './components/LabelSettings'
import LabelPreview from './components/LabelPreview'
import { generatePdf, isPrintable } from './lib/generatePdf'

let idCounter = 0
const newId = () => `f-${++idCounter}`

const initialItems: LabelItem[] = [
  { id: newId(), kind: 'text', name: 'Название', value: 'Футболка хлопок, чёрная', showName: false },
  { id: newId(), kind: 'barcode', name: 'Штрих-код', value: '2003421249001', showName: false },
  { id: newId(), kind: 'text', name: 'Артикул', value: 'А1301', showName: true },
]

const initialSettings: LabelSettings = {
  preset: '58x40',
  ...PRESETS['58x40'],
  fontSize: 9,
  format: 'EAN13',
  copies: 1,
}

export default function App() {
  const [items, setItems] = useState<LabelItem[]>(initialItems)
  const [settings, setSettings] = useState<LabelSettings>(initialSettings)

  const changeItem = (id: string, patch: Partial<LabelItem>) =>
    setItems((list) => list.map((it) => (it.id === id ? { ...it, ...patch } : it)))

  const addField = () =>
    setItems((list) => [...list, { id: newId(), kind: 'text', name: '', value: '', showName: true }])

  const removeItem = (id: string) =>
    setItems((list) => list.filter((it) => it.id !== id))

  const moveItem = (id: string, dir: -1 | 1) =>
    setItems((list) => {
      const i = list.findIndex((it) => it.id === id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= list.length) return list
      const next = [...list]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })

  const patchSettings = (patch: Partial<LabelSettings>) =>
    setSettings((s) => ({ ...s, ...patch }))

  const printable = useMemo(() => isPrintable(items), [items])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Генератор этикеток для Wildberries</h1>
        <p className="subtitle">Соберите этикетку из нужных полей и скачайте PDF для печати</p>
      </header>

      <main className="layout">
        <div className="col-main">
          <FieldEditor
            items={items}
            onChange={changeItem}
            onAddField={addField}
            onRemove={removeItem}
            onMove={moveItem}
          />
          <LabelSettingsPanel settings={settings} onChange={patchSettings} />

          <div className="generate-bar">
            <button
              type="button"
              className="btn primary"
              onClick={() => generatePdf(items, settings)}
              disabled={!printable}
            >
              Скачать PDF ↓
            </button>
            <span className="count">
              {printable
                ? settings.copies > 1
                  ? `Копий в PDF: ${settings.copies}`
                  : 'Одна этикетка в PDF'
                : 'Заполните хотя бы одно поле'}
            </span>
          </div>
        </div>

        <aside className="col-side">
          <LabelPreview items={items} settings={settings} />
        </aside>
      </main>

      <footer className="app-footer">
        Этикетки генерируются прямо в браузере — данные никуда не отправляются.
      </footer>
    </div>
  )
}
