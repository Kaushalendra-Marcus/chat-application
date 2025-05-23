import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider.jsx";
import io from 'socket.io-client'
export const SocketContext = createContext()
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuth()
    useEffect(() => {
        if (authUser) {
            const socket = io("5173", {
                query: {
                    userId: authUser?.user?._id,
                }
            })
            setSocket(socket)
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
                console.log("Online users updates");
            })
            return () => {
                if (socket) socket.disconnect()
            }
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])
    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => useContext(SocketContext)