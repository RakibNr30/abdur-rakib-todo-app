import { useState, useEffect } from 'react';
import {Badge} from "react-bootstrap";

const RemainingTime = ({ targetTime }) => {
    const calculateTimeRemaining = () => {
        const now = new Date().getTime();
        const target = new Date(targetTime).getTime();
        const difference = target - now;

        if (difference <= 0) {
            return <Badge bg={`danger`} className="ms-1 badge-title">Expired</Badge>
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / (1000));

        return <Badge bg={`primary`} className="ms-1 badge-title">{`${days}d ${hours}h ${minutes}m ${seconds}s`}</Badge>;
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetTime]);

    return timeRemaining;
};

export default RemainingTime;