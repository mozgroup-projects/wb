import type { Row } from '../types'

interface Props {
  rows: Row[]
  onChange: (id: string, field: keyof Omit<Row, 'id'>, value: string) => void
  onAdd: () => void
  onRemove: (id: string) => void
  onClear: () => void
}

export default function ProductTable({ rows, onChange, onAdd, onRemove, onClear }: Props) {
  return (
    <section className="card">
      <p className="hint">Заполните строки таблицы — каждая строка это одна этикетка:</p>
      <div className="table-wrap">
        <table className="product-table">
          <thead>
            <tr>
              <th>Штрих-код</th>
              <th>Название</th>
              <th>Артикул</th>
              <th className="col-action" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    value={row.barcode}
                    onChange={(e) => onChange(row.id, 'barcode', e.target.value)}
                    placeholder="2003421249001"
                    inputMode="numeric"
                  />
                </td>
                <td>
                  <input
                    value={row.name}
                    onChange={(e) => onChange(row.id, 'name', e.target.value)}
                    placeholder="Футболка хлопок, чёрная"
                  />
                </td>
                <td>
                  <input
                    value={row.article}
                    onChange={(e) => onChange(row.id, 'article', e.target.value)}
                    placeholder="А1301"
                  />
                </td>
                <td className="col-action">
                  <button
                    type="button"
                    className="icon-btn remove"
                    onClick={() => onRemove(row.id)}
                    title="Удалить строку"
                    aria-label="Удалить строку"
                  >
                    –
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-actions">
        <button type="button" className="btn" onClick={onAdd}>
          + Добавить строку
        </button>
        <button type="button" className="link-btn" onClick={onClear}>
          Очистить таблицу
        </button>
      </div>
    </section>
  )
}
