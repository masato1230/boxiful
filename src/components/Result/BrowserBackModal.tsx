import { IoMdWarning } from 'react-icons/io'

const BrowserBackModal = () => {
  return <div className="fixed z-50 top-0 w-screen h-screen bg-black bg-opacity-20">
    <div className="bg-white w-1/2 h-1/2 rounded-xl p-10 m-auto" style={{ marginTop: '10%' }}>
      <IoMdWarning className="mx-auto text-green-500" spacing={100} size="50%" />
    </div>
  </div>
}

export default BrowserBackModal;