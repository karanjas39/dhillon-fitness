"use client";

import { adminApi } from "@/store/api/adminApt";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdmin } from "@/store/slices/adminSlice";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getMotivationalMessage() {
  const messages = [
    "Keep pushing towards your goals!",
    "Every day is a new opportunity to succeed!",
    "Believe in yourself and all that you are!",
    "Great things never come from comfort zones!",
    "Your potential is endless!",
    "Don’t wait for opportunity. Create it!",
    "Dream it. Believe it. Build it.",
    "Success doesn’t just find you. You have to go out and get it!",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things take time. Be patient.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t come from what you do occasionally. It comes from what you do consistently.",
    "The key to success is to focus on goals, not obstacles.",
    "Dream it. Believe it. Achieve it.",
    "The only limit to our realization of tomorrow is our doubts of today.",
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

function AdminDetails() {
  const { data, isLoading } = adminApi.useGetAdminDetailsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && data && data.success) {
      dispatch(setAdmin(data.admin));
    }
  }, [isLoading, data]);

  if (isLoading) return <Loader />;

  const greeting = getGreeting();
  const motivationalMessage = getMotivationalMessage();
  const adminName = data?.admin.name.split(" ")[0];

  return (
    <div className="mt-6 mb-3 w-full flex flex-col">
      <h1 className="sm:text-4xl text-3xl font-bold">
        {greeting}, {adminName}
      </h1>
      <p className="mt-2 sm:text-base text-sm text-muted-foreground">
        {motivationalMessage}
      </p>
    </div>
  );
}

export default AdminDetails;
