'use client'
import { Bot, BotMessageSquare, ChartBar, LoaderCircle, SendHorizontal, X } from "lucide-react"
import { Input } from "../ui/input"
import { useMutation } from "@tanstack/react-query"
import { getChatbotInfo } from "@/services/chatbotApi"
import { useState } from "react"
import { Button } from "../ui/button"
import { formatChat, initialChat } from "@/utils/helpers"

const ChatBot = () => {
  const [chatbot, setChatbot] = useState(false);
  const [chat, setChat] = useState<any[]>([initialChat]);
  const [query, setQuery] = useState('');
  const { mutate, isPending } = useMutation({
    mutationFn: getChatbotInfo,
    onSuccess: (response) => {
      setQuery('');
      console.log(response);
      const formatText = formatChat(response.data)
      const receiver = {
        participant: 'receiver',
        data: formatText
      }
      setChat(prev => [...prev, receiver])
    }
  })
  const sendPrompt = () => {
    const sender = {
      participant: 'sender',
      data: query
    }
    setChat(prev => [...prev, sender])
    mutate(query)
  }
  const toggleChatbot = () => {
    setChatbot(!chatbot)
  }
  return (
    <div className={`fixed bottom-2 right-2 z-20 transition-all duration-300 overflow-hidden w-full max-w-[380px] flex flex-col gap-2`}>
      <div className={`flex flex-col bg-card-primary relative rounded-xl shadow-md overflow-hidden transition-all duration-300 ${chatbot ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-between bg-primary text-background p-2">
          <div className="flex items-center gap-2">
            <Bot size={30} />
            <span className="font-sans font-semibold">Zenya Bot</span>
          </div>
          <div onClick={toggleChatbot}>
            <X size={30} />
          </div>
        </div>
        <div className="h-[70dvh] md:h-[50dvh] flex flex-col gap-4 overflow-y-auto p-4">
          {chat?.map((item: any, index: number) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: item?.data }} className={`bg-card shadow-md relative w-[70%] rounded-xl p-2 text-foreground ${item?.participant === 'sender' ? 'self-end' : 'self-start'}`}></div>
          ))}
          {isPending && <div>
            <LoaderCircle size={30} className="animate-spin text-primary" />
          </div>}
        </div>
        <div className="sticky bottom-0">
          <div className="relative">
            <Input className="h-16" placeholder="Ask me about any medicine or disease" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button className="absolute top-0 right-0 bg-primary p-2 h-full" variant={query ? 'default' : 'secondary'} disabled={!query} onClick={sendPrompt}>
              <SendHorizontal />
            </Button>
          </div>
        </div>
      </div>
      <div className={`bg-primary rounded-full p-4 w-fit self-end`} onClick={toggleChatbot}>
        {chatbot ? <X /> : <BotMessageSquare />}
      </div>

    </div>
  )
}

export default ChatBot