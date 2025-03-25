
import { audioFiles1, weeklyStats } from '../../audioData1';

export const guidedMeditations = [
  { title: "Morning Meditation", duration: "10:00", url: "/music/guided meditaion/4-Minute Guided Mindfulness Meditation [TubeRipper.com].mp3"},
  { title: "Stress Relief", duration: "15:00" },
  { title: "Deep Sleep", duration: "20:00" },
  { title: "Anxiety Relief", duration: "12:00" },
  { title: "Focus Enhancement", duration: "8:00" },
  { title: "Gratitude Practice", duration: "10:00" }
];

export const meditationTechniques = [
  {
    title: "Mindfulness Meditation",
    description: "Focus on the present moment through breath awareness",
    image: "/assets/medi2.jpg"
  },
  {
    title: "Loving-Kindness Meditation",
    description: "Cultivate compassion and positive feelings towards others",
    image: "/assets/kindmedi.jpg"
  },
  {
    title: "Body Scan Meditation",
    description: "Progressive relaxation through body awareness",
    image: "/assets/bodyscan.jpg"
  },
  {
    title: "Transcendental Meditation",
    description: "Silent mantra meditation for deep relaxation",
    image: "/assets/medi3.jpg"
  }
];

export const articles = [
  {
    title: "The Science Behind Meditation",
    url: "https://www.healthline.com/nutrition/12-benefits-of-meditation"
  },
  {
    title: "Getting Started with Meditation",
    url: "https://www.mindful.org/how-to-meditate/"
  },
  {
    title: "Different Types of Meditation",
    url: "https://www.verywellmind.com/types-of-meditation-for-stress-relief-3144989"
  },
  {
    title: "Benefits of Daily Practice",
    url: "https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858"
  }
];

export const featureHoverContent = {
  guidedMeditation: {
    image: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&w=200&q=80",
    title: "Guided Meditation",
    description: "Follow along with expert-led meditation sessions designed to help you relax, focus, and find inner peace."
  },
  meditationTracker: {
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=200&q=80",
    title: "Track Your Progress",
    description: "Monitor your meditation journey, set goals, and maintain consistency with our easy-to-use tracking tools."
  },
  meditationTechniques: {
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80",
    title: "Learn Techniques",
    description: "Discover various meditation methods and find the perfect practice that resonates with you."
  }
};

export { audioFiles1, weeklyStats };
