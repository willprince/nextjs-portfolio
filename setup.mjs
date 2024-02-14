import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const template = `---
title: 'Hello, World!'
publishedAt: '2023-01-01'
summary: 'This is your first blog post.'
---

Hello, World!`;

const homePage = `export default function Page() {
  return (
    <div>
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">hey, I'm William Prince 👋</h1>
      <p className="prose prose-neutral dark:prose-invert">
        I'm a fullstack software engineer building great user experiences. I have experience working with html/css/js, React, TypeScript, Graphql and Rest apis. I am currently looking for new opportunities.
      </p>
    </section>
    <section>
      <div className="prose prose-neutral dark:prose-invert">
        <h2 className="font-medium text-2xl mb-8 tracking-tighter">my work</h2>
        <p className="prose prose-neutral dark:prose-invert">
          On a mission to build products users love, and along the way, increase my client revenus. Here's a summary of my work so far.
        </p>
        <h3 className="font-medium text-xl mb-1 tracking-tighter"><a href="https://centralio.com/">Centralio</a></h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">Fullstack software engineer</p>
        <p className="prose prose-neutral dark:prose-invert">I was the first software engineer hired at Centralio and I started building the fundation of the Saas application.</p>
        <ul>
          <li>
            Impliqué dans l'architecture, la conception et la mise en œuvre des
            fonctionnalités back-end en utilisant TypeScript.
          </li>
          <li>
            Collaboré avec d'autres ingénieurs pour évaluer et améliorer les interfaces
            logicielles et matérielles.
          </li>
          <li>
            Travaillé avec les membres de l'équipe de développement et de test
            logiciel pour concevoir et développer des solutions robustes répondant aux
            exigences des clients en termes de fonctionnalité, évolutivité et
            performance.
          </li>
        </ul>

        <h3 className="font-medium text-xl mb-1 tracking-tighter"><a href="https://centralio.com/">Centralio</a></h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">Fullstack software engineer</p>
        <p className="prose prose-neutral dark:prose-invert">I was the first software engineer hired at Centralio and I started building the fundation of the Saas application.</p>
        <ul>
          <li>
            Impliqué dans l'architecture, la conception et la mise en œuvre des
            fonctionnalités back-end en utilisant TypeScript.
          </li>
          <li>
            Collaboré avec d'autres ingénieurs pour évaluer et améliorer les interfaces
            logicielles et matérielles.
          </li>
          <li>
            Travaillé avec les membres de l'équipe de développement et de test
            logiciel pour concevoir et développer des solutions robustes répondant aux
            exigences des clients en termes de fonctionnalité, évolutivité et
            performance.
          </li>
        </ul>
        
      </div>
    </section>
    </div>
  );
}
`;

const workPage = `export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="prose prose-neutral dark:prose-invert">
          On a mission to build products users love, and along the way, increase my client revenus. Here's a summary of my work so far.
        </p>
        <h2 className="font-medium text-xl mb-1 tracking-tighter"><a href="https://centralio.com/">Centralio</a></h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">Fullstack software engineer</p>
        <p className="prose prose-neutral dark:prose-invert">I was the first software engineer hired at Centralio and I started building the fundation of the Saas application.</p>
        <ul>
          <li>
            First
          </li>
        </ul>
      </div>
    </section>
    
  );
}
`;

const deleteFolderRecursive = async (path) => {
  const stat = await fs.stat(path);
  if (stat.isDirectory()) {
    const files = await fs.readdir(path);
    await Promise.all(
      files.map((file) => deleteFolderRecursive(`${path}/${file}`))
    );
    await fs.rmdir(path);
  } else {
    await fs.unlink(path);
  }
};

(async () => {
  dotenv.config();

  if (process.env.IS_TEMPLATE === 'false') {
    // This means it's not the template, it's my legit site
    // I orderride the env variable for my site. This means that when
    // folks clone this repo for the first time, it will delete my personal content
    return;
  }

  const contentDir = path.join(process.cwd(), 'content');
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const appDir = path.join(process.cwd(), 'app');
  const workDir = path.join(process.cwd(), 'app', 'work');

  await deleteFolderRecursive(contentDir);
  await deleteFolderRecursive(imagesDir);
  await fs.mkdir(contentDir);
  await fs.writeFile(path.join(contentDir, 'hello-world.mdx'), template);
  await fs.writeFile(path.join(appDir, 'page.tsx'), homePage);
  await fs.writeFile(path.join(workDir, 'page.tsx'), workPage);
})();
