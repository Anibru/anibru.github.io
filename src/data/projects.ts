export interface Project {
    slug: string;
    title: string;
    category: string;
    summary: string;
    problem: string;
    approach: string;
    outcome: string;
    technologies: string[];
    featured: boolean;
  }
  
  export const projects: Project[] = [
    {
      slug: "saturn-ring-wave-analysis",
      title: "Saturn Ring Wave Analysis",
      category: "Scientific Computing",
      summary:
        "Computational analysis of wave structures in Saturn's rings using signal processing, physical modeling, and scientific visualization.",
      problem:
        "Wave signatures in stellar occultation profiles must be isolated from background structure and interpreted through the geometry and physics of Saturn's rings.",
      approach:
        "I developed a Python analysis pipeline using continuous wavelet transforms, ridge extraction, phase reconstruction, and physics-based forward modeling.",
      outcome:
        "The resulting workflow supports systematic comparison between observed occultation profiles and reconstructed wave models.",
      technologies: [
        "Python",
        "NumPy",
        "SciPy",
        "Wavelet Analysis"
      ],
      featured: true
    },
    {
      slug: "parallel-raycasting",
      title: "Parallel Raycasting",
      category: "Systems Programming",
      summary:
        "A multithreaded C raycasting system comparing alternative strategies for parallelizing illumination calculations.",
      problem:
        "Raycasting becomes computationally expensive as image dimensions, obstacle counts, and light counts increase.",
      approach:
        "I implemented sequential and POSIX-threaded versions using both light-based and column-based work partitioning.",
      outcome:
        "The project enabled direct correctness and performance comparisons among the sequential and parallel implementations.",
      technologies: [
        "C",
        "POSIX Threads",
        "Parallel Computing"
      ],
      featured: true
    },
    {
      slug: "machine-learning-implementations",
      title: "Machine Learning Implementations",
      category: "Machine Learning",
      summary:
        "Implementations of classification, neural-network, and kernel methods emphasizing mathematical foundations and model behavior.",
      problem:
        "Understanding machine-learning algorithms requires examining the optimization and inference procedures beneath high-level library interfaces.",
      approach:
        "I implemented and evaluated nearest-neighbor classifiers, perceptrons, support vector machines, multilayer perceptrons, and convolutional networks.",
      outcome:
        "The implementations provided a practical basis for studying model assumptions, optimization behavior, and generalization.",
      technologies: [
        "Python",
        "PyTorch",
        "NumPy"
      ],
      featured: true
    }
  ];