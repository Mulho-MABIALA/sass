import { useState } from 'react'

export default function Toggle({ defaultChecked = false, onChange }) {
  const [checked, setChecked] = useState(defaultChecked)
  const handle = () => {
    setChecked(!checked)
    onChange && onChange(!checked)
  }
  return (
    <label className="toggle-switch shrink-0">
      <input type="checkbox" checked={checked} onChange={handle} />
      <span className="toggle-slider"></span>
    </label>
  )
}
