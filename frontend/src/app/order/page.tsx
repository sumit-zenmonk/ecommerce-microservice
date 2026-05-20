"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Typography, } from "@mui/material";
import styles from "./order.module.css";

export default function OrderPage() {

    return (
        <Container maxWidth="xl" className={styles.container}>
            <Box className={styles.header}>
                <Typography variant="h4" className={styles.heading}>
                    Order Listing
                </Typography>

                <Typography className={styles.subHeading}>
                    Infinite Scroll Orders
                </Typography>
            </Box>
            <Box id="scrollableDiv" className={styles.scrollWrapper}>
                <InfiniteScroll
                    dataLength={1}
                    next={()=>{}}
                    hasMore={false}
                    loader={<Box className={styles.loader}><CircularProgress size={30} /></Box>}
                    endMessage={<Typography className={styles.endMessage}>Yay! You have seen it all</Typography>}
                    scrollableTarget="scrollableDiv"
                >
                    order 1
                    order 2
                    order 3
                    order 4
                </InfiniteScroll>
            </Box>
        </Container>
    );
}