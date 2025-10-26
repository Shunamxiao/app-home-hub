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
import { Download } from "lucide-react";

type Resource = {
    _id: string;
    url: string;
    size: number;
    version: string;
    channel: {
        name: string;
        icon: string;
        type: string;
        url_prefix: string | null;
    };
};

type DownloadButtonProps = {
    resource: Resource;
};

const formatBytes = (bytes: number | null, decimals = 2) => {
    if (bytes === null || bytes === 0) return 'N/A';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export function DownloadButton({ resource }: DownloadButtonProps) {
    const downloadUrl = resource.channel.type === 'third_party' && resource.channel.url_prefix 
        ? `${resource.channel.url_prefix}${resource.url}`
        : resource.url;
    
    const is123Cloud = resource.channel.name === '123云盘';

    const handleDownload = () => {
        window.open(downloadUrl, '_blank');
    };

    if (is123Cloud) {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="lg" className="w-full justify-start">
                        <Download className="h-5 w-5 mr-3"/>
                        <div className="text-left">
                            <div className="font-bold">{resource.channel.name}</div>
                            <div className="text-xs opacity-80">v{resource.version} • {formatBytes(resource.size)}</div>
                        </div>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>下载提示</AlertDialogTitle>
                        <AlertDialogDescription>
                            为保证高速下载，请设置【保存到云盘】然后按照提示下载App享受完全免费下载！
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDownload}>继续</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    }

    return (
        <Button asChild size="lg" className="w-full justify-start">
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-5 w-5 mr-3"/>
                <div className="text-left">
                    <div className="font-bold">{resource.channel.name}</div>
                    <div className="text-xs opacity-80">v{resource.version} • {formatBytes(resource.size)}</div>
                </div>
            </a>
        </Button>
    );
}