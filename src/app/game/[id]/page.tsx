import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowLeft, Download, Info, Calendar, GitBranch, AlertCircle, Star, Users, Package, FileCode } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type GameDetails = {
    _id: string;
    name: string;
    description: string;
    summary: string;
    icon: string;
    header_image?: string;
    detail_images: string[];
    tags: string[];
    developer: string;
    file_size: number | null;
    latest_at: string;
    latest_content: string;
    limit_age: string;
    release_at: string;
    download_count_show: string;
    star: number;
    resource: {
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
    }[];
};

async function getGameDetails(id: string): Promise<GameDetails | null> {
  try {
    const response = await fetch(`https://api.us.apks.cc/game/info?id=${id}`, { next: { revalidate: 3600 } });
    const result = await response.json();
    
    if (response.ok && result.data && result.data.code === 200) {
      return result.data;
    }

    const errorMessage = result.data?.message || result.message || 'Unknown API error';
    console.error(`API error for game details id: ${id}`, errorMessage);
    // If the game info is mostly there but resources are missing, we might still want to show the page.
    // The check for `result.data.name` is a heuristic to see if we got partial data.
    if(result.data && result.data.name) {
      return result.data;
    }
    return null;

  } catch (error) {
    console.error(`Error fetching game details for id: ${id}:`, error);
    return null;
  }
}

const formatBytes = (bytes: number | null, decimals = 2) => {
    if (bytes === null || bytes === 0) return 'N/A';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) => (
    <div className="flex items-start gap-3 text-sm">
        <Icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
        <div className="flex-1">
            <span className="font-semibold">{label}:</span>
            <span className="ml-2 text-muted-foreground">{value}</span>
        </div>
    </div>
);


export default async function GameDetailPage({ params }: { params: { id: string } }) {
  const game = await getGameDetails(params.id);

  if (!game) {
    notFound();
  }

  // Sanitize description
  const cleanDescription = game.description.replace(/<br>/g, '\n').replace(/<br \/>/g, '\n');

  return (
    <main className="bg-background">
      <div className="container mx-auto max-w-5xl px-2 sm:px-4 py-8">
        <div className="mb-6">
            <Button asChild variant="outline">
                <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to List
                </Link>
            </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="relative h-48 md:h-64 w-full">
            <Image
              src={game.header_image || (game.detail_images.length > 0 ? game.detail_images[0] : '/placeholder.svg')}
              alt={`${game.name} header image`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          <CardContent className="p-4 sm:p-6 -mt-20 relative z-10">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Image
                src={game.icon}
                alt={`${game.name} icon`}
                width={128}
                height={128}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-background shadow-lg shrink-0"
              />
              <div className="w-full">
                <h1 className="text-3xl md:text-4xl font-headline tracking-wide">{game.name}</h1>
                <p className="text-lg text-primary font-semibold mt-1">{game.developer}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {game.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                    <h2 className="text-2xl font-headline mb-4">About this game</h2>
                    <p className="whitespace-pre-line text-muted-foreground">{cleanDescription}</p>
                </div>
                <div>
                    <div className="sticky top-8">
                        <h2 className="text-2xl font-headline mb-4">Downloads</h2>
                        <div className="flex flex-col gap-3">
                            {game.resource && game.resource.length > 0 ? game.resource.map(res => {
                                const downloadUrl = res.channel.type === 'third_party' && res.channel.url_prefix 
                                    ? `${res.channel.url_prefix}${res.url}`
                                    : res.url;
                                return (
                                <Button asChild key={res._id} size="lg" className="w-full justify-start">
                                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="h-5 w-5 mr-3"/>
                                        <div className="text-left">
                                            <div className="font-bold">{res.channel.name}</div>
                                            <div className="text-xs opacity-80">v{res.version} • {formatBytes(res.size)}</div>
                                        </div>
                                    </a>
                                </Button>
                            );}) : (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>No Download Links</AlertTitle>
                                    <AlertDescription>
                                        Sorry, there are no download links available for this game at the moment.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {game.detail_images && game.detail_images.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-headline mb-4">Gallery</h2>
                <Carousel className="w-full">
                  <CarouselContent>
                    {game.detail_images.map((img, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <Card className="overflow-hidden">
                            <CardContent className="flex aspect-[16/9] items-center justify-center p-0">
                                <Image src={img} alt={`Screenshot ${index + 1}`} width={1280} height={720} className="w-full h-full object-cover" />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-12" />
                  <CarouselNext className="mr-12"/>
                </Carousel>
              </div>
            )}
            
            <div className="mt-12">
                <h2 className="text-2xl font-headline mb-4">Game Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <InfoRow icon={Star} label="Rating" value={`${game.star}/5`} />
                    <InfoRow icon={Users} label="Downloads" value={game.download_count_show || 'N/A'} />
                    <InfoRow icon={Package} label="Content Rating" value={game.limit_age || 'Not rated'} />
                    <InfoRow icon={Calendar} label="Released On" value={game.release_at ? new Date(game.release_at).toLocaleDateString() : 'N/A'} />
                    <InfoRow icon={GitBranch} label="Last Updated" value={game.latest_at ? new Date(game.latest_at).toLocaleDateString() : 'N/A'} />
                    <InfoRow icon={FileCode} label="Developer" value={game.developer || 'Unknown'} />
                </div>
            </div>

            {game.latest_content && (
                <div className="mt-12">
                    <h2 className="text-2xl font-headline mb-4">What's New</h2>
                    <Card>
                        <CardContent className="p-6">
                            <p className="whitespace-pre-line text-sm text-muted-foreground">{game.latest_content.replace(/<br>/g, '\n').replace(/<br \/>/g, '\n')}</p>
                        </CardContent>
                    </Card>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
