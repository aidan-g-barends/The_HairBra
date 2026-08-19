import { useEffect, useState } from 'react'
import { supabase } from './services/supabase'

function App() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    async function fetchTest() {
      const { data, error } = await supabase
        .from('connection_test')
        .select('*')

      if (error) {
        setMessage('Error: ' + error.message)
        return
      }

      setMessage(data[0]?.message || 'No rows found')
    }

    fetchTest()
  }, [])

  return (
    <h1 className="text-4xl font-bold text-amber-400 bg-black p-8">
      {message}
    </h1>
  )
}

export default App