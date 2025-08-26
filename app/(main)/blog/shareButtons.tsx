"use client";

import { useState } from "react";
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react";

interface ShareButtonsProps {
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title }) => {
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="relative">
      <button
        onClick={() => setIsSharing(!isSharing)}
        className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </button>
      
      {isSharing && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
          <div className="flex space-x-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;