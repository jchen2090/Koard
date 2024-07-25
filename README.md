<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Koard</h3>

  <p align="center">
    Open Source Custom Kanban Board
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
        <a href="#key-features">Key Features</a>
    </li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project
![image](https://github.com/user-attachments/assets/9e353635-71a4-4ea5-a9db-51a7d1db2d38)

Inspired by Notion, Koard empowers users to create personalized kanban boards for tracking and organizing tasks efficiently. With Koard, you can easily manage your workflow, visualize progress, and stay on top of pending tasks.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Key Features
- **Customizable Kanban Boards**: Create and customize boards to fit your unique project needs.
- **Drag and Drop**: Effortlessly move tasks between columns and reorder columns using intuitive drag-and-drop functionality.
- **Real-time Updates**: Built with NextJS and Supabase, Koard ensures that all changes are saved in real-time, providing a seamless and up-to-date experience.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
- <a href="https://supabase.com/">Supabase Account</a>

### Installation

1. Get your project URL and anon API key from supabase 
2. Clone the repo
   ```sh
   git clone https://github.com/jchen2090/Koard.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your keys in `.env.local`
   ```
    NEXT_PUBLIC_SUPABASE_URL=[YOUR PROJECT URL]
    NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR ANON API KEY] 
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
