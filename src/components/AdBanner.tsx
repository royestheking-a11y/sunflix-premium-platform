import React, { useEffect, useCallback } from 'react';
import { getAllAds, updateAd } from '../lib/mongodb-storage';
import { motion } from 'framer-motion';

interface AdBannerProps {
  position: 'banner' | 'sidebar' | 'between-rows';
  className?: string;
}

export function AdBanner({ position, className = '' }: AdBannerProps) {
  const [ad, setAd] = React.useState<any | null>(null);

  const fetchAndSetAd = useCallback(async () => {
    try {
      const ads = await getAllAds();
      const available = (ads || []).filter((a: any) => a.active && a.position === position);
      
      if (available.length === 0) {
        setAd(null);
        return;
      }
      
      const picked = available[Math.floor(Math.random() * available.length)];
      // Ensure we have a valid ID (either _id or id)
      const adId = picked.id || picked._id;
      if (!adId) {
        console.warn('Ad missing ID:', picked);
        return;
      }
      
      setAd(picked);
      
      // increment impression count (best-effort)
      try {
        await updateAd(adId, { impressions: (picked.impressions || 0) + 1 });
      } catch (e) {
        // ignore - impression tracking is not critical
        // eslint-disable-next-line no-console
        console.error('Failed to track ad impression', e);
      }
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  }, [position]);

  useEffect(() => {
    let mounted = true;
    
    // Initial fetch
    fetchAndSetAd();

    // Refresh ads every 10 seconds to pick up new ads quickly
    const refreshInterval = setInterval(() => {
      if (mounted) {
        fetchAndSetAd();
      }
    }, 10000); // 10 seconds - faster refresh for new ads

    // Refresh on window focus (when user comes back to tab)
    const handleFocus = () => {
      if (mounted) {
        fetchAndSetAd();
      }
    };
    window.addEventListener('focus', handleFocus);

    // Listen for custom event when ads are updated
    const handleAdUpdate = () => {
      if (mounted) {
        fetchAndSetAd();
      }
    };
    window.addEventListener('adsUpdated', handleAdUpdate);

    return () => {
      mounted = false;
      clearInterval(refreshInterval);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('adsUpdated', handleAdUpdate);
    };
  }, [fetchAndSetAd]);

  const handleClick = async () => {
    if (ad) {
      const adId = ad.id || ad._id;
      if (adId) {
        try {
          await updateAd(adId, { clicks: (ad.clicks || 0) + 1 });
        } catch (e) {
          // ignore - click tracking is not critical
          // eslint-disable-next-line no-console
          console.error('Failed to track ad click', e);
        }
      }
      if (ad.clickUrl) {
        window.open(ad.clickUrl, '_blank');
      }
    }
  };

  // Don't render anything if there's no ad
  if (!ad) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white z-10">
        Sponsored
      </div>
      <img
        src={ad.imageUrl}
        alt={ad.title}
        className="w-full h-auto rounded-lg border border-white/10 group-hover:border-[#FFB800]/50 transition-all"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
    </motion.div>
  );
}
