
'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";

type FeedbackDialogProps = {
    gameName: string;
};

export function FeedbackDialog({ gameName }: FeedbackDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="link" size="sm">反馈下载问题</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>反馈下载问题</AlertDialogTitle>
                    <AlertDialogDescription>
                        如游戏版本过低，或者急缺游戏，可以添加QQ：3788767702，或者
                        <a 
                            href={`mailto:apkscc-feedback@foxmail.com?subject=Feedback for ${gameName}`}
                            className="text-primary underline"
                        >
                            【发送邮件】
                        </a>
                        到apkscc-feedback@foxmail.com反馈。
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>关闭</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
