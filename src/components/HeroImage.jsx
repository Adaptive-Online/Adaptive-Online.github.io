import { motion } from 'framer-motion';

const ANIMATION_CONFIG = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

const IMAGE_PROPS = {
  src: '/images/neil-profile.png',
  alt: 'Neil Taggart Portrait',
  size: 350,
};

// Simplified cloud path - scaled up by 5.76x (was 57.6x)
const CLOUD_PATH = "M198 180c16.434 0 28.8-12.366 28.8-28.8s-12.366-32.4-28.8-32.4c0-41.093-34.507-72-75.6-72-36.37 0-69.12 23.122-75.6 57.6h-7.2C17.902 104.4 3.6 123.454 3.6 144s15.454 36 36 36z";

export default function HeroImage() {
  return (
    <motion.div
      {...ANIMATION_CONFIG}
      className="relative w-[460px] h-[400px] -mt-8"
    >
      <svg 
        viewBox="0 0 450 450" 
        className="w-full h-full"
      >
        <defs>
          <clipPath id="cloudClip">
            <path d={CLOUD_PATH} transform="translate(21.775, -3.63) scale(2.01613)" />
          </clipPath>
        </defs>

        {/* Clipped image */}
        <image
          href={IMAGE_PROPS.src}
          width="268.57"
          height="268.57"
          x="90.715"
          y="90.715"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#cloudClip)"
        />

        {/* Single outline */}
        <path
          d={CLOUD_PATH}
          transform="translate(21.775, -3.63) scale(2.01613)"
          fill="none"
          className="stroke-primary"
          strokeWidth="1.5"
        />
      </svg>
    </motion.div>
  );
}
