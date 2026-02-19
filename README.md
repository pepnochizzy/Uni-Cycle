# Uni-cycle

We found that when you go to university, it can be difficult to buy everything you need and when you leave, it is difficult to get rid of everything. That's why we made Uni-cycle: a community space for connecting and recycling.

## Contributers

- Ulrike K
- Arron B
- Lara G
- Andrew B

## Built with

- NextJS, Tailwind CSS, CSS, HTML, javascript, Supabase, Clerk, Vercel, Lucide react icons, Motion, PG

## Getting Started

- In order to use this code, please fork this repo and use npm i in your terminal. This should give you all the required packages to enable you to add to the code base and run it with the command "npm run dev".
- If you want to use this application, you can find the link within the repo "About" section. Simply click the link and create a secure profile (created with Clerk Auth).
- You will then be able to create a profile by completing the "create profile" form that you will be directed to upon sign-up.
- After creating a profile you will be able to navigate to the marketplace and your personal profile.
- By default, you will see posts from your university as we want a community feel where you can buy/organise events/sell with others in your study area.
- The marketplace has filtering/sorting options and you can also add posts from here.
- In order to like, comment or view a post in full, click the view button on a post where you will be taken to a dynamic page for that listing.
- You can also click a users username in order to see all posts made by them.
- If you wish to edit your posts you can do this from the individual item page or from your profile page.
- If you wish to edit your profile, you can do this from the profile page and either use the "edit university" button or the profile picture to change your account details/profile picture.

## Features

- Marketpage to sell/buy/borrow items
- Create posts
- Log in/sign-up/auth
- Filter by university to get personalised feeds
- Comments
- Likes
- Delete posts
- Update/edit posts

## Stretch goals

- Events page
- Attendees function ("I'm interested!"/"I'm going")
- Image Bucket, to have images on selling posts

## Resources

# Supabase Buckets

https://supabase.com/storage
https://supabase.com/docs/reference/javascript/initializing

## Reflections

## Team merge/conflict resolutions

- Over the course of our project, due to the limitted time span, we found that there were moments when working on the same pages was inevitable and therefore, we had a few times where we needed to manage merge conflicts.
  We decided that if merge conflicts would arise, we would manage them as a team to ensure all code was maintained and no one's code was lost.
  We had some conflicts where we were able to manage them with a simple "accept both changes" within Git. We also had one where we used vscode inline conflict actions. We were able to see the current main, our incoming changes and a preview of what our changes would look like.
  As a team, we checked each change was how we needed it to be and included all code added and then merged from VScode and pushed it to git.
  Overall, we found using VScode to manage conflicts was the most accessible and user friendly way, it visualised it and made editting easy.

## Lara's Reflection

### What went well

- Our planning was strong, we had an easy to follow Figma and Trello board, this meant throughout the week we could check back, see our wireframes and follow what we set out to do on Monday. We had a clear MVP and stretch goals, this meant we knew what we could focus on early in the week and what to leave until MVP was finished- limitted scope creep.
- I felt our teamwork was strong, we followed our original plans on Figma. Every morning we would each take a task after standup and would check in frequently or ask for help from teammates. We would reevaluate before or after lunch and assign tasks when needed.
- I worked on front end and backend, as seen in the commits.
- We often all worked on each page and each function, either with paired programming or by adding on when needed.
- We had a firm style set by Andrew at the beginning of the week and so it was very easy for us all to follow from this lead and keep the styling familiar throughout each component and page.
- We ensured the accessibility was at least 90%, adding aria tags where needed and ensuring the text was contrasting from the background.

### Any struggles?

- My most difficult challenge was the comment tree. Once Uli had made the ability to create comments, we decided we wanted to have the ability to reply to comments. This was because a user might make an offer, and the original poster would likely need to reply (especially since there is no messaging function on this application).
  We started by adding a parent_id to the supabase comments table that linked to the comment_id. I used the Didit project from our previous assignment (https://github.com/Tech-Educators/didit-reddit-upvote-example) as a reference as we knew we had done trees before. I also checked mdn docs for conditional rendering.
  I then had it where if I had clicked reply, the supabase table knew what comment it linked to BUT it still displayed as a "normal" comment. This means it showed as a seperate comment below, whereas we wanted it indented within the parent comment. After coming up with a couple of solutions, I tried the simplest first and it worked.
  In order to solve this challenge, I relied on my teammates and documentation to support debugging.
- At the start of the week, I was unwell which meant I was more involved with paired programming with Uli. Especially with the initial comments functionality and the profile page. This was a good experience of paired programming as it is not something I have a lot of experience in. Due to our frequent stand-ups we were able to manage me needing time away for GP appointments etc with little friction.

### Biggest lessons learned

- As with anytime we do group assignments, I find them invaluable for learning to work on others' code. It is an extremely useful skill within a workplace and so I always appreciate the ability to work with others vs making an application solo. It is fun to bounce ideas with teammates and to see different ways to approach a solution to how I usually do it - often finding simpler ways!
- Git. This assignment was a well needed refresher on Git, especially for merge conflicts and reviewing/approving teammates code.

### resources:

Clip Path: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path
Tailwind Docs: https://tailwindcss.com/
Didit repo: https://github.com/Tech-Educators/didit-reddit-upvote-example
previous assignment: https://github.com/pepnochizzy/RePaged--book-review-site-iteration-3
Clerk docs: https://clerk.com/docs/nextjs/getting-started/quickstart
Lucide docs: https://lucide.dev/icons/
Radix docs (component removed): https://www.radix-ui.com/primitives/docs/components/dropdown-menu
Mdn for small checks on syntax

## Uli's reflection

## Lessons learned

### Image Buckets

We wanted users to be able to upload their own images from their local machine. I did some previous research on Storage Buckets in Supabase for a previous assignment but wasn't able to implement it then. During the planning sessions I did some additional research and managed to set up a storage bucket within supabase. Important here is that while the bucket is public, we still had to add policies to Select and Insert to allow the SubmitForm to upload and the marketplace to display the images alongside the post.

We also had to install the supabase package and it was the first time for me to user server and client supabase functions. While it took some time to make sure the code was working it was a pretty straight forward setup, as documentation was clear and several youtube videos are available.

Important as well is to add the image hist to the config file otherwise the images will not be displayed.

### Displaying posts by universities only

One aim of the page was that students are only able to see posts of students going to the same university. We managed this by adapting the sequel on the marketplace page and using currentUser. There were some initial issues with the setup as i initially used auth() but the server wasn't able to fetch the user id before the render so assumed that there were no posts at this university. However, with currentUser and await this was then possible.

### Filtering in Next.js

While we did sorting in previous workshops and assignments, I never actually created a filter function in Next.js. It was quite difficult as we had to establish which function was client side and which had to go in a server component. The actual filter runs in the browser and handles the changes when the user clicks the dropdown. This then updates the URL. However the Filter component does not have access to the database so is actually unable to filter the content of the page. This had to happen within the route itself. It reads the URL it has been given by the Filter component, completes the action and re-renders the page.

Next.js is doing this with router.push(URL) and searchParams within the client. I also had an issue where internal workings were displayed within the URL but managed to do a work around with URLSearchPAram(window.location.search). This then resulted in the correct URL being shown in the browser. It took some time but in the end we were able to filter by category and sort by date/category

### Resources

https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#search-params
https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
