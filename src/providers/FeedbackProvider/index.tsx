"use client";

import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

type FeedbackProps = {
  message: string;
  type: AlertColor;
};

interface FeedbackProviderGlobalData {
  feedback: (props: FeedbackProps) => void;
}

const feedbackProviderGlobalData: FeedbackProviderGlobalData = {
  feedback: () => {
    throw new Error("Não há um feedback provider definido");
  },
};

export const useFeedback = () => (props: FeedbackProps) =>
  feedbackProviderGlobalData.feedback(props);

interface FeedbackProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
const FeedbackProvider = ({ children }: FeedbackProviderProps) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<AlertColor>("success");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsFeedbackOpen(false);
  }, []);

  useEffect(() => {
    feedbackProviderGlobalData.feedback = (props) => {
      setFeedbackMessage(props.message);
      setFeedbackType(props.type);
      setIsFeedbackOpen(true);
    };
  }, []);

  return (
    <>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isFeedbackOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          severity={feedbackType}
          onClose={handleClose}
          className="!w-full"
        >
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FeedbackProvider;
