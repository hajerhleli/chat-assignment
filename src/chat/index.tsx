import { Input } from "../input";
import { Icon } from "../icon";
import { useState, useEffect } from "react";

export const Chat = ({socket}) => {
    const [isOpen, setisOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    const handleSendMessage = (e: any) => {
      e.preventDefault();
      if (message.trim() && localStorage.getItem('userName')) {
        socket.emit('message', {
          text: message,
          name: localStorage.getItem('userName'),
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
          time: new Date()
        });
      }
      setMessage('');
    };

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
      }, [socket, messages]);
    
    return (
      <>
        <div className={`fixed bottom-4 right-4 px-4 pt-4 pb-12 z-20 w-[375px]`}>
          <div className="w-full flex items-center border rounded-full bg-neutral-700 border-neutral-400 focus:border-blue-500">
            <Input
              id="message-input"
              type="text"
              value={message}
              autoFocus
              onChange={(value: string) => setMessage(value)}
              onKeyDown={() => {}}
              onClick={()=> setisOpen(true)}
              placeholder={'Type your message...'}
            />
            <Icon name="send" color="#ffffff" className="mr-2 text-white ml-1" onClick={(e) => {
                handleSendMessage(e)
            }} />
          </div>
        </div>
        {isOpen && (
          <div
            className="fixed bottom-4 right-4 flex flex-col mb-4  shadow-md h-[70vh] w-[375px] block`}"
            onClick={() => {}}
          >
            <div className="flex flex-row relative w-full bg-neutral-700 justify-center p-4 text-white">
              <Icon name="chevronLeft" color="#ffffff" className="absolute left-4 top-4" onClick={() => setisOpen(false)} />
              <div>Conversation</div>
            </div>
            {messages.length > 0 ? (
              <div className="flex flex-col p-4 overflow-y-auto float-right max-h-[79%]">
               {messages.map((msg, i) => {
                  if (msg.name === localStorage.getItem('userName')){
                    return ( 
                      <div className="text-right border rounded min-h-[100px] p-3 m-1 border-0 bg-cyan-100">
                        <p className="text-gray-400">{msg.name}</p>
                        <p key={msg.id} className="break-words " >{msg.text}</p>
                        <p className="text-gray-400">{new Date(msg.time).getHours()}:{new Date(msg.time).getMinutes()}</p>
                      </div>
                    )
                  } else {
                    return (
                      <div className="text-left border rounded min-h-[100px] p-3 m-1 border-0 bg-blue-100">
                        <p className="text-gray-400">{msg.name}</p>
                        <p key={msg.id} className="break-words " >{msg.text}</p>
                        <p className="text-gray-400">{new Date(msg.time).getHours()}:{new Date(msg.time).getMinutes()}</p>
                      </div>
                    )
                  }
                } 
               )}
              </div>
            ) : null}
          </div>
        )}
      </>
    );
  };