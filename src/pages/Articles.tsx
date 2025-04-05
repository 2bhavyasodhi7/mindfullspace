
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Headphones, XCircle, BookOpen, Tag, Calendar, Clock } from 'lucide-react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { defaultControlsSection, defaultProgressBarSection, audioPlayerStyles } from '@/utils/audioPlayerUtils';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  audioUrl: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: 'The Benefits of Daily Meditation',
      excerpt: 'Regular meditation practice can significantly improve mental health, focus, and overall wellbeing.',
      content: `
        <h1>The Benefits of Daily Meditation</h1>
        
        <p>In our fast-paced world, finding moments of peace can seem like an impossible task. Meditation offers a pathway to stillness amid the chaos, providing a sanctuary for the mind and body.</p>
        
        <p>Research consistently demonstrates that regular meditation practice yields profound benefits for mental, emotional, and physical health. Even dedicating just 10 minutes a day to this practice can transform your relationship with stress and enhance your quality of life.</p>
        
        <h2>Mental Clarity and Focus</h2>
        
        <p>One of the most immediate benefits of meditation is improved mental clarity. Regular practitioners report enhanced concentration, better memory retention, and greater ability to focus on complex tasks. This mental sharpness emerges from the discipline of returning attention to the present moment, training the mind to recognize when it has wandered and gently guiding it back.</p>
        
        <p>Studies using neuroimaging have shown that meditation actually changes brain structure, particularly in areas associated with attention and sensory processing. These changes translate to measurable improvements in cognitive performance.</p>
        
        <h2>Stress Reduction</h2>
        
        <p>Perhaps the most well-documented benefit of meditation is stress reduction. The practice activates the parasympathetic nervous system—our "rest and digest" mode—countering the constant activation of the sympathetic "fight or flight" response that characterizes modern stress.</p>
        
        <p>Regular meditation has been shown to lower cortisol levels, reduce inflammation, and help regulate blood pressure. These physiological changes help explain why consistent meditators report feeling more peaceful and resilient in the face of life's challenges.</p>
        
        <h2>Emotional Regulation</h2>
        
        <p>Meditation creates space between stimulus and response, allowing us to witness our emotions rather than being controlled by them. This mindful distance provides the opportunity to choose our reactions rather than falling into habitual patterns.</p>
        
        <p>Over time, meditation practitioners develop greater emotional intelligence and stability. They're less likely to be overwhelmed by difficult emotions and more capable of maintaining perspective during challenging situations.</p>
        
        <h2>Getting Started</h2>
        
        <p>Beginning a meditation practice doesn't require expensive equipment or special locations. Start with just 5 minutes daily of focused attention on your breath. As you become comfortable, gradually increase the duration.</p>
        
        <p>Consistency matters more than duration. A daily 10-minute practice will yield more benefits than occasional hour-long sessions.</p>
        
        <p>Remember that meditation is a practice, not a performance. There is no "perfect meditation" – every session offers valuable experience, even those filled with distractions and wandering thoughts.</p>
      `,
      imageUrl: 'src/pages/images/m1.jpg',
      audioUrl: 'src/pages/audio/meditation-audio.mp3',
      author: 'Sarah Johnson',
      date: 'April 2, 2025',
      readTime: '6 min read',
      tags: ['Meditation', 'Mental Health', 'Wellness']
    },
    {
      id: '2',
      title: 'Understanding Anxiety and How to Manage It',
      excerpt: 'Learn effective strategies to recognize and manage anxiety in your daily life.',
      content: `
        <h1>Understanding Anxiety and How to Manage It</h1>
        
        <p>Anxiety is a natural human experience—a built-in alarm system that alerts us to potential threats. However, when this system becomes overactive, it can significantly impact quality of life. Understanding the mechanisms of anxiety and developing practical management strategies can transform your relationship with this challenging emotion.</p>
        
        <h2>The Nature of Anxiety</h2>
        
        <p>Anxiety is more than just worry—it's a complex interplay of thoughts, emotions, and physical sensations. The racing heart, shallow breathing, and tense muscles are biological responses designed to prepare us for danger. In the modern world, these responses are often triggered by psychological rather than physical threats, creating discomfort without serving their evolutionary purpose.</p>
        
        <p>For many people, anxiety becomes a chronic companion, coloring everyday experiences with apprehension and unease. Understanding that these feelings stem from ancient protective mechanisms can help us approach them with greater compassion.</p>
        
        <h2>Mindfulness as a Tool</h2>
        
        <p>Mindfulness offers a powerful approach to working with anxiety. By observing anxious thoughts and sensations without judgment, we can interrupt the automatic escalation that often turns mild concern into overwhelming fear.</p>
        
        <p>Start by simply noticing when anxiety arises. What thoughts accompany it? Where do you feel it in your body? This curious, non-reactive observation begins to change your relationship with anxiety, creating space for new responses.</p>
        
        <h2>Practical Management Strategies</h2>
        
        <p>Beyond mindfulness, several practical approaches can help manage anxiety:</p>
        
        <ul>
          <li><strong>Breathing techniques:</strong> Deep, diaphragmatic breathing activates the parasympathetic nervous system, naturally calming anxiety.</li>
          <li><strong>Physical movement:</strong> Regular exercise helps metabolize stress hormones and regulate mood.</li>
          <li><strong>Sleep hygiene:</strong> Prioritizing quality sleep creates resilience against anxiety.</li>
          <li><strong>Limiting stimulants:</strong> Reducing caffeine and other stimulants can prevent physical sensations that mimic or exacerbate anxiety.</li>
        </ul>
        
        <h2>When to Seek Support</h2>
        
        <p>While self-management strategies are valuable, professional support is important if anxiety significantly impacts your functioning. Therapies like Cognitive Behavioral Therapy (CBT) have strong evidence for treating anxiety disorders, and medication can be helpful in some cases.</p>
        
        <p>Remember that seeking help is a sign of strength, not weakness. With the right support, even severe anxiety can be effectively managed.</p>
      `,
      imageUrl: 'src/pages/images/m2.jpg',
      audioUrl: 'src/pages/audio/anxiety-audio.mp3',
      author: 'Michael Chen',
      date: 'March 29, 2025',
      readTime: '7 min read',
      tags: ['Anxiety', 'Mental Health', 'Self-care']
    },
    {
      id: '3',
      title: 'Improving Sleep Quality for Better Health',
      excerpt: 'Quality sleep is crucial for overall health. Discover proven techniques to get better rest.',
      content: `
        <h1>Improving Sleep Quality for Better Health</h1>
        
        <p>Sleep is the foundation upon which good health is built. Yet in our hyper-connected world, quality sleep often becomes a casualty of busy schedules and digital distractions. Understanding the importance of sleep and implementing evidence-based strategies to improve it can transform your health and well-being.</p>
        
        <h2>The Science of Sleep</h2>
        
        <p>During sleep, your body engages in essential maintenance—consolidating memories, repairing tissues, balancing hormones, and clearing cellular waste from the brain. These processes are critical for cognitive function, emotional regulation, immune response, and metabolic health.</p>
        
        <p>Sleep occurs in cycles of approximately 90 minutes, moving through different stages including light sleep, deep sleep, and REM (rapid eye movement) sleep. Each stage serves distinct physiological purposes, and a healthy night's sleep includes multiple complete cycles.</p>
        
        <h2>Creating Optimal Sleep Conditions</h2>
        
        <p>Your sleep environment significantly impacts sleep quality. Aim for a bedroom that is:</p>
        
        <ul>
          <li><strong>Dark:</strong> Even small amounts of light can disrupt melatonin production.</li>
          <li><strong>Cool:</strong> The ideal temperature for sleep is around 65°F (18°C).</li>
          <li><strong>Quiet:</strong> Use earplugs or white noise if necessary to mask disruptive sounds.</li>
          <li><strong>Comfortable:</strong> Invest in a supportive mattress and pillows that work for your body.</li>
        </ul>
        
        <h2>Building a Sleep Routine</h2>
        
        <p>Consistency is key for quality sleep. Your body's circadian rhythm functions best when you maintain regular sleep and wake times, even on weekends. Establish a calming pre-sleep routine to signal to your body that it's time to wind down.</p>
        
        <p>Consider including activities like:</p>
        <ul>
          <li>Gentle stretching or yoga</li>
          <li>Reading (from a physical book rather than a screen)</li>
          <li>Meditation or deep breathing</li>
          <li>Writing in a gratitude journal</li>
        </ul>
        
        <h2>Digital Detox for Better Rest</h2>
        
        <p>The blue light emitted by phones, tablets, and computers interferes with melatonin production, delaying and disrupting sleep. Additionally, the stimulating content we consume on these devices can activate stress responses that make it difficult to transition to sleep.</p>
        
        <p>Try to disconnect from screens at least 60 minutes before bed, and keep devices out of the bedroom if possible.</p>
        
        <h2>Nutrition and Sleep</h2>
        
        <p>What you consume affects how you sleep. Limit caffeine after mid-day, moderate alcohol consumption (which disrupts REM sleep), and avoid large meals close to bedtime. Some people find that foods rich in magnesium, like leafy greens and nuts, or those containing tryptophan, like turkey and dairy, support better sleep.</p>
      `,
      imageUrl: 'src/pages/images/m3.jpg',
      audioUrl: 'src/pages/audio/sleep-audio.mp3',
      author: 'Priya Patel',
      date: 'March 24, 2025',
      readTime: '8 min read',
      tags: ['Sleep', 'Wellness', 'Health']
    },
    {
      id: '4',
      title: 'Rewire Your Brain: The Power of Neuroplasticity',
      excerpt: 'Discover how you can literally change your brain through focused practice and mindfulness.',
      content: `
        <h1>Rewire Your Brain: The Power of Neuroplasticity</h1>
        
        <p>For much of the 20th century, scientists believed that the adult brain was relatively fixed—its structure and function largely established in childhood. We now know this is far from true. The brain remains malleable throughout life, constantly reorganizing itself based on experiences and focused attention. This property, known as neuroplasticity, offers profound possibilities for personal transformation.</p>
        
        <h2>Understanding Neuroplasticity</h2>
        
        <p>Neuroplasticity refers to the brain's ability to form new neural connections, strengthen existing ones, and even reorganize itself after injury. This happens on multiple levels, from microscopic changes in individual neurons to large-scale changes visible on brain scans.</p>
        
        <p>The saying "neurons that fire together, wire together" (Hebb's rule) captures a fundamental principle of neuroplasticity. When we repeatedly engage in a thought or activity, the neural pathways involved become stronger and more efficient, making that pattern more likely to recur.</p>
        
        <h2>Mindfulness as a Tool for Rewiring</h2>
        
        <p>Mindfulness meditation is one of the most well-researched approaches to intentional brain change. Regular practice has been shown to:</p>
        
        <ul>
          <li>Increase gray matter density in areas associated with attention and emotional regulation</li>
          <li>Reduce activity in the default mode network, which is linked to mind-wandering and rumination</li>
          <li>Strengthen connections between the prefrontal cortex and the amygdala, improving emotional regulation</li>
        </ul>
        
        <p>These changes aren't just theoretical—they translate to measurable improvements in attention, stress management, and emotional wellbeing.</p>
        
        <h2>Daily Practices for Positive Neuroplasticity</h2>
        
        <p>Beyond formal meditation, many daily practices can harness neuroplasticity for positive change:</p>
        
        <h3>Gratitude Practice</h3>
        <p>Regularly focusing on things you're grateful for strengthens neural pathways associated with positive emotions. Even during difficult times, intentionally noticing and appreciating small pleasures can gradually rewire your brain's default response patterns.</p>
        
        <h3>Learning New Skills</h3>
        <p>Novel experiences and challenges create new neural connections. Learning a musical instrument, studying a language, or mastering a craft all provide healthy stimulation for your brain, potentially building cognitive reserve that protects against age-related decline.</p>
        
        <h3>Movement and Exercise</h3>
        <p>Physical activity increases production of brain-derived neurotrophic factor (BDNF), sometimes called "fertilizer for the brain." BDNF supports the growth and maintenance of neurons, facilitating learning and memory formation.</p>
        
        <h2>Overcoming Negative Patterns</h2>
        
        <p>Understanding neuroplasticity also helps explain why negative thought patterns and habits can be so persistent—they've been strengthened through repetition. The good news is that the same principles apply to changing these patterns.</p>
        
        <p>When we notice ourselves engaging in unwanted thought patterns, we can deliberately redirect our attention, gradually weakening those neural pathways while strengthening more helpful alternatives. This process requires patience and consistency but becomes easier with practice.</p>
        
        <h2>The Time Factor</h2>
        
        <p>Significant brain changes don't happen overnight. Research suggests that forming new habits typically takes anywhere from 18 to 254 days, with an average of about 66 days. Creating lasting change requires commitment and consistency.</p>
        
        <p>However, even small daily practices can accumulate into meaningful transformation over time. The key is persistence and self-compassion during the inevitable setbacks that occur along the way.</p>
        
        <h2>Conclusion</h2>
        
        <p>Your brain is constantly being shaped by your experiences and where you direct your attention. By understanding and working with neuroplasticity, you can become an active participant in this process rather than a passive recipient.</p>
        
        <p>Remember that every thought and action is, in a small way, reinforcing neural pathways. Choose wisely what you practice and repeat, knowing that you are literally rewiring your brain with each mindful choice.</p>
      `,
      imageUrl: 'src/pages/images/REWIRE_BRAIN.jpg',
      audioUrl: 'src/pages/audio/neuroplasticity-audio.mp3',
      author: 'Dr. James Wilson',
      date: 'March 18, 2025',
      readTime: '10 min read',
      tags: ['Neuroplasticity', 'Brain Health', 'Science']
    },
    {
      id: '5',
      title: 'The Art of Mindful Breathing',
      excerpt: 'Learn how conscious breathing techniques can transform your mental state in minutes.',
      content: `
        <h1>The Art of Mindful Breathing</h1>
        
        <p>Breath is life—the most fundamental rhythm of existence. We take roughly 20,000 breaths each day, yet most of us pay little attention to this constant companion. Learning to breathe mindfully offers a powerful tool for psychological well-being, emotional regulation, and spiritual connection.</p>
        
        <h2>The Science of Breath</h2>
        
        <p>Your breathing pattern directly influences your nervous system. Rapid, shallow breathing activates your sympathetic "fight-or-flight" response, while slow, deep breathing engages the parasympathetic "rest-and-digest" system. This biological connection between breath and nervous system function explains why breathing techniques can so effectively shift your mental and physical state.</p>
        
        <p>Research has shown that controlled breathing practices can lower blood pressure, reduce stress hormone levels, improve immune function, and increase heart rate variability—a key marker of physiological resilience.</p>
        
        <h2>Foundational Breathing Techniques</h2>
        
        <h3>Diaphragmatic Breathing</h3>
        <p>Often called "belly breathing," this technique engages your diaphragm fully:</p>
        <ol>
          <li>Place one hand on your abdomen and one on your chest</li>
          <li>Inhale slowly through your nose, allowing your abdomen to expand while keeping your chest relatively still</li>
          <li>Exhale completely through your mouth or nose</li>
          <li>Continue for 3-5 minutes</li>
        </ol>
        
        <h3>4-7-8 Breathing</h3>
        <p>Developed by Dr. Andrew Weil, this technique is particularly effective for calming anxiety:</p>
        <ol>
          <li>Inhale quietly through your nose for 4 counts</li>
          <li>Hold your breath for 7 counts</li>
          <li>Exhale completely through your mouth, making a gentle "whoosh" sound, for 8 counts</li>
          <li>Repeat up to 4 times when beginning this practice</li>
        </ol>
        
        <h3>Box Breathing</h3>
        <p>Used by Navy SEALs and other high-performance groups:</p>
        <ol>
          <li>Inhale for 4 counts</li>
          <li>Hold for 4 counts</li>
          <li>Exhale for 4 counts</li>
          <li>Hold for 4 counts</li>
          <li>Repeat for 5-10 cycles</li>
        </ol>
        
        <h2>Breath as Anchor for Mindfulness</h2>
        
        <p>Beyond specific techniques, simply paying attention to your natural breath serves as an excellent focus for mindfulness practice. The breath provides several advantages as a meditation anchor:</p>
        
        <ul>
          <li>It's always available—no equipment needed</li>
          <li>It's rhythmic, giving the mind a natural pattern to follow</li>
          <li>It connects body and mind, bridging physical and mental experience</li>
          <li>It reflects emotional states, offering insight into subtle feelings</li>
        </ul>
        
        <p>To practice breath-focused mindfulness, simply bring gentle awareness to the sensations of breathing. Notice the air moving through your nostrils, the rise and fall of your chest or abdomen, the subtle sounds of inhalation and exhalation. When your mind wanders—as it naturally will—gently return attention to the breath without judgment.</p>
        
        <h2>Bringing Mindful Breathing Into Daily Life</h2>
        
        <p>While formal breathing practices are valuable, integrating breath awareness into everyday activities can transform ordinary moments:</p>
        
        <ul>
          <li>Take three conscious breaths before checking your phone in the morning</li>
          <li>Use red traffic lights as reminders to check in with your breathing</li>
          <li>Practice "transition breathing"—taking a mindful breath when moving between activities</li>
          <li>Notice how your breath changes with different emotional states</li>
        </ul>
        
        <h2>Cultural Perspectives on Breath</h2>
        
        <p>Many wisdom traditions recognize the special significance of breath. In Sanskrit, the word "prana" refers to both breath and vital life energy. In Greek, "pneuma" means both breath and spirit. These linguistic connections reflect an intuitive understanding that breath represents something greater than mere biological function—it is the tangible expression of life itself.</p>
        
        <h2>A Lifelong Practice</h2>
        
        <p>Mindful breathing is not a technique to master and move beyond, but rather a practice to return to throughout life. The breath offers a constant invitation to presence—a bridge between the unconscious bodily processes and conscious awareness.</p>
        
        <p>By developing a relationship with your breath, you gain access to a portable tool for self-regulation that requires no special equipment and can be practiced anywhere. In a world of increasing complexity and stimulation, this simple practice offers a path to centeredness and calm.</p>
      `,
      imageUrl: 'src/pages/images/MINDFULL_BREATHING.jpg',
      audioUrl: 'src/pages/audio/breathing-audio.mp3',
      author: 'Emma Rodriguez',
      date: 'March 12, 2025',
      readTime: '8 min read',
      tags: ['Breathing', 'Mindfulness', 'Stress Relief']
    },
    {
      id: '6',
      title: 'The Science of Gratitude',
      excerpt: 'Explore how cultivating gratitude can transform your brain and improve wellbeing.',
      content: `
        <h1>The Science of Gratitude</h1>
        
        <p>Gratitude—the feeling of appreciation for what one has received—might seem like a simple emotion, but research reveals it has profound effects on psychological and physical health. From ancient wisdom traditions to modern neuroscience, the practice of gratitude consistently emerges as a powerful catalyst for wellbeing.</p>
        
        <h2>Neurological Benefits of Gratitude</h2>
        
        <p>When we experience or express gratitude, our brains release dopamine and serotonin—neurotransmitters responsible for feelings of pleasure and contentment. This neurochemical shift creates immediate positive feelings and, with regular practice, can help establish neural patterns that predispose us toward gratitude rather than negativity or complaint.</p>
        
        <p>Brain imaging studies show that gratitude practice activates areas in the prefrontal cortex associated with learning and decision-making, suggesting that gratitude helps us make better choices and learn more effectively.</p>
        
        <h2>Psychological Benefits</h2>
        
        <p>Regular gratitude practice has been linked to:</p>
        
        <ul>
          <li>Reduced symptoms of depression</li>
          <li>Lower anxiety levels</li>
          <li>Improved sleep quality</li>
          <li>Enhanced resilience during challenging times</li>
          <li>Greater overall life satisfaction</li>
        </ul>
        
        <p>These benefits appear to stem from gratitude's ability to shift attention from what's lacking to what's present, interrupting the tendency toward negative rumination that characterizes many psychological challenges.</p>
        
        <h2>Social Benefits</h2>
        
        <p>Gratitude strengthens relationships by:</p>
        
        <ul>
          <li>Increasing feelings of connection and trust</li>
          <li>Promoting helping behaviors toward others</li>
          <li>Reducing aggression, even when provoked</li>
          <li>Enhancing empathy and reducing envy</li>
        </ul>
        
        <p>These effects create upward spirals in relationships, where expressions of gratitude foster positive interactions that in turn generate more gratitude.</p>
        
        <h2>Practical Gratitude Practices</h2>
        
        <h3>Gratitude Journal</h3>
        <p>One of the most researched gratitude practices involves writing down things you're thankful for. For maximum benefit:</p>
        <ul>
          <li>Aim for depth rather than breadth—writing in detail about one thing you appreciate is more effective than listing many items</li>
          <li>Focus on people more than things</li>
          <li>Consider surprises or unexpected positive events</li>
          <li>Write about what your life would be like without certain blessings</li>
        </ul>
        
        <h3>Gratitude Letters and Visits</h3>
        <p>Psychologist Martin Seligman's research found that writing and delivering a letter of gratitude to someone who made a positive difference in your life but has never been properly thanked produces substantial increases in happiness that can last for weeks.</p>
        
        <h3>Gratitude Meditation</h3>
        <p>This practice involves deliberately focusing on things you're grateful for during meditation. It can be as simple as repeating phrases like "I am grateful for..." and allowing specific people, experiences, or things to come to mind.</p>
        
        <h2>Overcoming Obstacles to Gratitude</h2>
        
        <p>Despite its benefits, cultivating gratitude isn't always easy. Common obstacles include:</p>
        
        <ul>
          <li>A culture that emphasizes acquiring more rather than appreciating what we have</li>
          <li>Comparison with others, particularly on social media</li>
          <li>The brain's negativity bias—our tendency to notice and dwell on negative events</li>
          <li>Genuine hardship that makes gratitude feel forced or inauthentic</li>
        </ul>
        
        <p>When facing these challenges, start small and be gentle with yourself. Gratitude shouldn't be another item on your self-improvement to-do list that generates guilt. Instead, approach it with curiosity, noticing even tiny moments of appreciation when they naturally arise.</p>
        
        <h2>Gratitude During Difficult Times</h2>
        
        <p>Contrary to popular misconception, practicing gratitude doesn't mean ignoring problems or pretending everything is perfect. In fact, some research suggests that gratitude is most powerful precisely when life is challenging.</p>
        
        <p>During difficult periods, gratitude helps maintain perspective, highlighting that even amid suffering, some good remains. This doesn't diminish the reality of pain but provides a more complete picture of experience.</p>
        
        <h2>Conclusion</h2>
        
        <p>Gratitude isn't just a pleasant emotion—it's a practice with measurable effects on brain function and overall wellbeing. By intentionally cultivating thankfulness through regular practice, we can reshape our perception in ways that enhance happiness, strengthen relationships, and build resilience.</p>
        
        <p>The beauty of gratitude lies in its accessibility. No matter your circumstances, there is always something to appreciate, and the simple act of noticing and acknowledging these gifts can transform your experience of life.</p>
      `,
      imageUrl: 'src/pages/images/scenery.jpg',
      audioUrl: 'src/pages/audio/gratitude-audio.mp3',
      author: 'Dr. Liam Taylor',
      date: 'March 5, 2025',
      readTime: '9 min read',
      tags: ['Gratitude', 'Positive Psychology', 'Wellbeing']
    },
    {
      id: '7',
      title: 'Mindfulness for Children: Building Emotional Intelligence',
      excerpt: 'Teaching mindfulness to children provides lifelong tools for emotional regulation and focus.',
      content: `
        <h1>Mindfulness for Children: Building Emotional Intelligence</h1>
        
        <p>In a world of increasing distraction and stimulation, children face unique challenges to maintaining focus and regulating emotions. Mindfulness offers powerful tools to help young people navigate these challenges, building skills that will serve them throughout life.</p>
        
        <h2>Why Children Need Mindfulness</h2>
        
        <p>Children today are growing up in an environment fundamentally different from previous generations:</p>
        
        <ul>
          <li>Digital technology provides constant stimulation and potential distraction</li>
          <li>Academic pressures begin at increasingly younger ages</li>
          <li>Scheduled activities often leave little time for quiet reflection</li>
          <li>Social media introduces complex dynamics around self-image and comparison</li>
        </ul>
        
        <p>These factors can contribute to rising rates of anxiety, attention issues, and emotional dysregulation. Mindfulness practices provide an antidote by teaching children to relate to their thoughts and emotions in healthier ways.</p>
        
        <h2>Benefits for Children</h2>
        
        <p>Research on mindfulness programs for children shows multiple benefits:</p>
        
        <ul>
          <li>Improved attention and focus</li>
          <li>Better emotional regulation</li>
          <li>Enhanced executive function skills</li>
          <li>Decreased anxiety and stress</li>
          <li>Increased compassion toward self and others</li>
          <li>Improved conflict resolution skills</li>
        </ul>
        
        <p>These benefits extend beyond individual wellbeing to create more harmonious classroom and family environments.</p>
        
        <h2>Age-Appropriate Approaches</h2>
        
        <h3>Early Childhood (3-6 years)</h3>
        <p>For young children, mindfulness should be playful and brief:</p>
        <ul>
          <li>"Spidey senses" practice: Using all five senses to notice details about surroundings</li>
          <li>"Breathing buddies": Placing a stuffed animal on their belly and watching it rise and fall with the breath</li>
          <li>"Weather report": Checking in with how they're feeling inside using weather metaphors</li>
        </ul>
        
        <h3>Elementary School (7-11 years)</h3>
        <p>Children at this age can begin to understand more abstract concepts:</p>
        <ul>
          <li>Body scan practices</li>
          <li>"Mindful movements" adapted from yoga</li>
          <li>Simple guided visualizations</li>
          <li>Gratitude practices like sharing "three good things" each day</li>
        </ul>
        
        <h3>Middle School and Beyond (12+ years)</h3>
        <p>Adolescents can engage with more sophisticated practices:</p>
        <ul>
          <li>Longer sitting meditations</li>
          <li>Mindful walking</li>
          <li>Journaling about thoughts and emotions</li>
          <li>Compassion and loving-kindness practices</li>
        </ul>
        
        <h2>Introducing Mindfulness at Home</h2>
        
        <p>Parents can foster mindfulness through both formal practices and everyday moments:</p>
        
        <h3>Creating Rituals</h3>
        <p>Simple daily rituals help establish mindfulness as a natural part of life:</p>
        <ul>
          <li>Starting the day with three mindful breaths</li>
          <li>Sharing a moment of gratitude before meals</li>
          <li>Taking a "mindful minute" before homework</li>
          <li>Practicing a brief body scan or visualization before bedtime</li>
        </ul>
        
        <h3>Mindful Moments</h3>
        <p>Everyday activities become opportunities for mindfulness practice:</p>
        <ul>
          <li>Eating slowly and noticing flavors, textures and smells</li>
          <li>Walking outside with attention to sights, sounds, and sensations</li>
          <li>Listening to music together with full attention</li>
          <li>Noticing sensations during bath time or while brushing teeth</li>
        </ul>
        
        <h2>Supporting Emotional Awareness</h2>
        
        <p>Mindfulness helps children develop emotional intelligence through:</p>
        
        <h3>Naming Emotions</h3>
        <p>Research shows that the simple act of labeling emotions activates the prefrontal cortex and helps regulate the limbic system. Help children develop a rich emotional vocabulary by naming feelings without judgment.</p>
        
        <h3>Body Awareness</h3>
        <p>Guide children to notice physical sensations associated with different emotions—the tightness in the chest with anxiety, the warmth in the cheeks with embarrassment. This body awareness provides early warning signals for emotional reactions.</p>
        
        <h3>Mindful Responses</h3>
        <p>Perhaps most importantly, mindfulness creates space between stimulus and response. Children learn they can pause, breathe, and choose how to respond rather than reacting automatically when strong emotions arise.</p>
        
        <h2>Being a Mindful Role Model</h2>
        
        <p>Children learn more from what we do than what we say. When parents and teachers practice mindfulness themselves, they not only receive the benefits but also model these skills for children. This might mean:</p>
        
        <ul>
          <li>Taking a few deep breaths before responding when frustrated</li>
          <li>Acknowledging your own emotions openly: "I'm feeling disappointed right now, so I'm going to take a moment to breathe"</li>
          <li>Demonstrating gratitude and appreciation in daily life</li>
          <li>Showing self-compassion when making mistakes</li>
        </ul>
        
        <h2>Conclusion</h2>
        
        <p>Teaching mindfulness to children is not about creating perfect little meditators. It's about giving young people tools to navigate their inner and outer worlds with greater awareness, kindness, and wisdom.</p>
        
        <p>In a world that increasingly values achievement and productivity, mindfulness reminds children—and the adults who care for them—that being present for this moment is itself a profound achievement.</p>
      `,
      imageUrl: 'src/pages/images/green leaves.jpg',
      audioUrl: 'src/pages/audio/children-mindfulness-audio.mp3',
      author: 'Maya Thompson',
      date: 'February 28, 2025',
      readTime: '11 min read',
      tags: ['Children', 'Emotional Intelligence', 'Parenting']
    },
    {
      id: '8',
      title: 'Mindful Eating: Transforming Your Relationship with Food',
      excerpt: 'Learn how mindful eating can help you enjoy food more while making healthier choices.',
      content: `
        <h1>Mindful Eating: Transforming Your Relationship with Food</h1>
        
        <p>Food is far more than fuel—it's pleasure, connection, culture, and comfort. Yet in our fast-paced world, eating often becomes automatic, unconscious, and disconnected from the sensory experience it's meant to be. Mindful eating offers a path back to a more conscious, satisfying, and healthy relationship with food.</p>
        
        <h2>What Is Mindful Eating?</h2>
        
        <p>Mindful eating means bringing full attention to the experience of eating and drinking. It involves:</p>
        
        <ul>
          <li>Noticing colors, smells, textures, and flavors</li>
          <li>Eating slowly and without distraction</li>
          <li>Distinguishing between actual hunger and non-hunger triggers for eating</li>
          <li>Learning to identify and respect fullness cues</li>
          <li>Appreciating food and its origins</li>
          <li>Noticing how food affects your physical and emotional state</li>
        </ul>
        
        <p>This approach stands in stark contrast to "mindless eating"—consumption driven by external cues, habitual patterns, emotional needs, or simply eating until a plate is clean rather than until satisfaction is reached.</p>
        
        <h2>The Science of Mindful Eating</h2>
        
        <p>Research suggests multiple benefits from mindful eating practices:</p>
        
        <h3>Weight Management</h3>
        <p>Mindful eating can help with weight management not through restriction but by helping people respond to actual hunger and fullness cues. Studies show that mindful eaters tend to choose more appropriate portion sizes and are less likely to engage in binge eating behaviors.</p>
        
        <h3>Digestive Health</h3>
        <p>The digestive process begins before food enters the mouth. When we see, smell, and anticipate food, the body starts releasing digestive enzymes. Eating in a relaxed, attentive state promotes optimal digestion by activating the parasympathetic nervous system.</p>
        
        <h3>Psychological Benefits</h3>
        <p>Mindful eating has been shown to reduce stress around food choices, decrease emotional eating, increase enjoyment of meals, and foster a healthier body image. It helps break the cycle of guilt and shame that often accompanies eating in diet culture.</p>
        
        <h2>Practical Mindful Eating Techniques</h2>
        
        <h3>The Raisin Exercise</h3>
        <p>This classic mindfulness exercise involves eating a single raisin (or other small food item) with complete attention:</p>
        <ol>
          <li>Hold the raisin and examine it carefully, noticing color, texture, and shape</li>
          <li>Smell the raisin, paying attention to any arising thoughts or reactions</li>
          <li>Place the raisin in your mouth without chewing, exploring the sensation</li>
          <li>Begin chewing slowly, noticing flavors as they're released</li>
          <li>Swallow with full awareness, tracking the sensation as it moves down</li>
        </ol>
        <p>This exercise, while seemingly simple, often reveals how little attention we typically pay to eating.</p>
        
        <h3>Creating a Mindful Eating Environment</h3>
        <p>The setting in which we eat significantly influences our experience:</p>
        <ul>
          <li>Eat at a table, not while standing, driving, or working</li>
          <li>Remove distractions—turn off screens and put away phones</li>
          <li>Use smaller plates if appropriate, serving yourself modest portions with the option for seconds</li>
          <li>Consider the aesthetic experience—simple touches like a flower, candle, or nice placement can elevate a meal</li>
        </ul>
        
        <h3>The Five-Minute Check-In</h3>
        <p>Before eating, take five minutes to check in with your body and mind:</p>
        <ul>
          <li>Assess your hunger level on a scale of 1-10</li>
          <li>Notice any emotions present and whether they might be driving eating</li>
          <li>Take a few deep breaths to transition into a more relaxed state</li>
          <li>Express gratitude for the food and everyone involved in bringing it to you</li>
        </ul>
        
        <h2>Mindful Eating in a Busy World</h2>
        
        <p>While ideally every meal would be a contemplative experience, real life often presents challenges. Some strategies for bringing mindfulness to eating even when time is limited:</p>
        
        <ul>
          <li>Take three conscious breaths before beginning to eat, even if the meal will be quick</li>
          <li>Choose one meal or snack daily to eat with full attention</li>
          <li>Practice "first bite awareness"—even in a rushed meal, take time to fully experience the first bite</li>
          <li>Put down utensils between bites periodically</li>
          <li>Notice when you've stopped tasting food (a sign of mindless eating) and redirect attention</li>
        </ul>
        
        <h2>Beyond the Individual Plate</h2>
        
        <p>Fully mindful eating extends beyond personal consumption to consider broader implications:</p>
        
        <h3>Food Origins</h3>
        <p>Contemplating where food comes from—the soil, sunlight, water, and human labor involved—can deepen appreciation and inform more conscious choices.</p>
        
        <h3>Cultural Context</h3>
        <p>Food carries cultural significance and family history. Mindfully engaging with these dimensions can enrich the eating experience and connect us to heritage and community.</p>
        
        <h3>Environmental Impact</h3>
        <p>Mindful eating naturally leads to consideration of how food choices affect the planet, potentially guiding decisions about local, seasonal, and sustainably produced options.</p>
        
        <h2>A Journey, Not a Destination</h2>
        
        <p>Like all mindfulness practices, mindful eating is ongoing rather than something to perfect. It's about developing awareness that allows for more conscious choices, not following rigid rules.</p>
        
        <p>Even experienced practitioners have distracted meals or moments of unconscious eating. The practice isn't about achieving perfection but about returning awareness to the present moment again and again, cultivating a relationship with food characterized by attention, appreciation, and balance.</p>
      `,
      imageUrl: 'src/pages/images/BODY_SCAN.jpg',
      audioUrl: 'src/pages/audio/mindful-eating-audio.mp3',
      author: 'Chef Thomas Miller',
      date: 'February 21, 2025',
      readTime: '9 min read',
      tags: ['Nutrition', 'Mindful Eating', 'Wellbeing']
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);

  useEffect(() => {
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredArticles(results);
  }, [searchTerm, articles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mindful-lighter to-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-mindful-light/20 to-mindful-lighter py-16">
        <div className="container-custom">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Mindfulness Resources</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Articles</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="text-center mb-12">
            <h1 className="mindful-heading text-4xl md:text-5xl lg:text-6xl font-raleway mb-4">
              Mindfulness <span className="text-mindful">Articles</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-calming">
              Explore our collection of thoughtfully crafted articles to deepen your understanding of mindfulness practices and their benefits.
            </p>
          </div>
          
          <div className="flex justify-center max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search articles by title, content or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-full border-mindful/30 focus:border-mindful focus:ring-mindful"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <Card key={article.id} className="rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 border-mindful/20 h-full flex flex-col">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105" 
                />
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  {article.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} className="bg-mindful-lighter text-mindful hover:bg-mindful-light">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h2 className="text-xl font-semibold mb-3 font-raleway line-clamp-2">{article.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{article.excerpt}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4 mt-auto">
                  <Calendar size={16} className="mr-1" />
                  <span className="mr-4">{article.date}</span>
                  <Clock size={16} className="mr-1" />
                  <span>{article.readTime}</span>
                </div>
                
                {activeAudio === article.id ? (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-mindful">Audio Narration</h3>
                      <button 
                        onClick={() => setActiveAudio(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                    <AudioPlayer
                      src={article.audioUrl}
                      showJumpControls={true}
                      layout="stacked-reverse"
                      customControlsSection={defaultControlsSection}
                      customProgressBarSection={defaultProgressBarSection}
                      className="audio-player-custom rounded-md"
                      style={audioPlayerStyles}
                    />
                  </div>
                ) : null}
                
                <div className="flex justify-between items-center mt-auto">
                  <Button 
                    onClick={() => setActiveAudio(activeAudio === article.id ? null : article.id)} 
                    variant="outline"
                    size="sm"
                    className="bg-white text-mindful border-mindful/30"
                  >
                    <Headphones className="mr-2" size={16} />
                    {activeAudio === article.id ? "Hide Audio" : "Listen"}
                  </Button>
                  <Link 
                    to={`/article/${article.id}`} 
                    state={{ article }} 
                    className="apple-button text-sm"
                  >
                    <BookOpen size={16} className="mr-1" />
                    Read Article
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Articles;
