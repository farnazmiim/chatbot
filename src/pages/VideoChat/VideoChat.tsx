import AppLayout from '../../components/AppLayout/AppLayout'
import Avatar from '../../components/Avatar/Avatar'
import { PauseIcon, MessageIcon, MicrophoneIcon } from '../../components/Icons'

function VideoChat() {
  return (
    <AppLayout showBack={true}>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex flex-col items-center justify-center px-4 min-h-0">
          <div className="w-full max-w-sm aspect-square max-h-[320px] rounded-2xl overflow-hidden bg-[#0a0a0f] mb-6 flex items-center justify-center">
            <Avatar type="female" size="lg" />
          </div>
          <p className="text-gray-500 text-sm">ویدئو چت</p>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl px-6 py-4 flex justify-center items-center gap-6 mx-4 mb-4">
          <button className="w-14 h-14 rounded-full bg-gray-400/60 flex items-center justify-center hover:bg-gray-400/80 transition-colors">
            <PauseIcon className="w-6 h-6 text-white" />
          </button>
          <button className="w-14 h-14 rounded-full bg-[#FF8C00] flex items-center justify-center hover:bg-[#FF9F33] transition-colors">
            <MicrophoneIcon className="w-6 h-6 text-white" />
          </button>
          <button className="w-14 h-14 rounded-full bg-gray-400/60 flex items-center justify-center hover:bg-gray-400/80 transition-colors">
            <MessageIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

export default VideoChat
