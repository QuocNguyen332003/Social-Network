import { Card, CardMedia } from '@mui/material';

interface VideoCardProps {
    linkVideo: string;
}

const VideoCard = ({linkVideo}: VideoCardProps) => {
  return (
    <Card>
      <CardMedia
        component="video"
        src={linkVideo}
        controls
        height={200}
        style={{ objectFit: 'cover' }}
      />
    </Card>
  );
};

export default VideoCard;
