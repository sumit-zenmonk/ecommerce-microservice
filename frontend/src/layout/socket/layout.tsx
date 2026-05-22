"use client"
import { SocketEventNameEnum } from "@/enum/socket.enum";
import { socketUpdateOrderPaymentStatus, socketUpdateOrderStatus } from "@/redux/feature/order/order-slice";
import { socketProductStockDeduct } from "@/redux/feature/product/product-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { RootState } from "@/redux/store";
import { connectSocket, disconnectSocket } from "@/service/socket";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

export default function RootSocketListener() {
    const { token } = useAppSelector((state: RootState) => state.authReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token) {
            const socket = connectSocket(token);

            socket.on(SocketEventNameEnum.ORDER_STATUS_CHANGED, (message) => {
                enqueueSnackbar(`Order Status ${message.nextStatus} changed`, { variant: "info" });
                dispatch(socketUpdateOrderStatus(message));
            });

            socket.on(SocketEventNameEnum.ORDER_PAID, (message) => {
                enqueueSnackbar(`Order paid ${JSON.stringify(message)}`, { variant: "info" });
                dispatch(socketUpdateOrderPaymentStatus(message));
            });

            socket.on(SocketEventNameEnum.PRODUCT_STOCK_DEDUCT, (message) => {
                enqueueSnackbar(`Stock Deduct ${JSON.stringify(message)}`, { variant: "info" });
                dispatch(socketProductStockDeduct(message));
            });

            return () => {
                disconnectSocket();
            };
        }
    }, [token, dispatch]);

    return null;
}