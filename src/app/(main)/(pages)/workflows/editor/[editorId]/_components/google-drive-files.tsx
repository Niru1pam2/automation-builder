"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { getGoogleListener } from "../../../../../../../../actions/workflow-connections";
import { LoaderOne } from "@/components/ui/loader";
import { Card, CardDescription } from "@/components/ui/card";
import { CardContainer } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";

export default function GoogleDriveFiles() {
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const reqGoogle = async () => {
    setLoading(true);
    const response = await axios.get("/api/drive-activity");
    if (response) {
      toast.success(response.data);
      setLoading(false);
      setIsListening(true);
    }
    setIsListening(false);
  };

  const onListener = async () => {
    const listener = await getGoogleListener();
    if (listener?.googleResourceId !== null) {
      setIsListening(true);
    }
  };

  useEffect(() => {
    onListener();
  }, []);

  return (
    <div className="flex flex-col gap-3 pb-6">
      {isListening ? (
        <Card className="py-3">
          <CardContainer>
            <CardDescription>Listening...</CardDescription>
          </CardContainer>
        </Card>
      ) : (
        <Button
          variant="outline"
          {...(!loading && {
            onClick: reqGoogle,
          })}
        >
          {loading ? (
            <div className="absolute flex h-full w-full items-center justify-center">
              <LoaderOne />
            </div>
          ) : (
            <p className="truncate">Create Listener</p>
          )}
        </Button>
      )}
    </div>
  );
}
