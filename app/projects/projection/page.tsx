import React from 'react';

export default function ProjectionMapping() {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-4xl font-bold my-6" id="projection-mapping-project">
                Projection Mapping Project: Transforming Education and Storytelling in K-12 Classrooms
            </h1>
            <h2 className="text-2xl font-semibold my-4" id="project-overview">Project Overview</h2>
            <p className="text-lg mb-4">
                The Projection Mapping Project was developed for CSC490—a capstone project course at the University of
                Toronto. Our class was given the objective to create an experience that could be used in K-12
                classrooms, enabling new mediums for education and storytelling.
            </p>
            <div className="my-6">
                <h4 className="text-xl font-semibold my-4">Watch the Project in Action</h4>
                {/* YouTube Video Template */}
                <div className="aspect-w-16 aspect-h-9">
                    <iframe
                        src="https://www.youtube.com/embed/71GhNPpc5WA"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded"
                    ></iframe>
                </div>
            </div>
            <p className="text-lg mb-4">
                After a few brainstorming sessions, I proposed the idea of bringing the technology of projection mapping
                into the classroom. Many of us shared the experience of creating shoebox dioramas in school, and we
                envisioned using projection mapping to transform these dioramas into dynamic storytelling tools instead
                of static displays.
            </p>
            <p className="text-lg mb-4">
                Inspired by our professors’ work on animatronics and making technology accessible to primary and
                secondary school classrooms, we aimed to create a versatile tool that could be used across various
                subjects. The potential audience for such software would be vast, as it could integrate key curriculum
                requirements from multiple disciplines. For instance, a diorama depicting a natural landscape could
                require knowledge of biology, cultural heritage, and language arts, allowing students to craft a
                compelling script and story for the environment.
            </p>
            <h3 className="text-xl font-semibold my-4" id="software-development">Software Development</h3>
            <p className="text-lg mb-4">
                Our projection mapping software integrates multiple open-source projects into one cohesive web studio.
                It enables users to create characters, upload audio recordings for animation, add image backgrounds, and
                manipulate characters and objects through keyframes. For example, users can animate the setting sun and
                the rising moon to represent the passage of time in a story.
            </p>
            <p className="text-lg mb-4">
                Considering the prevalence of Chromebooks in the current educational landscape, we decided to develop
                the project as a web application to maximize accessibility. The backend is powered by a small Python
                Flask server that manages the storage and serving of uploaded assets. The frontend is built with React
                and Next.js (Page Router). We integrated Ready Player Me for 3D avatar creation, Theatre.js for
                animation, Three.js and React 3 Fiber for importing and animating 3D objects, and Rhubarb Lip Sync on
                the backend to generate mouth maps for characters based on their audio scripts.
            </p>
            <h3 className="text-xl font-semibold my-4" id="features">Features</h3>
            <p className="text-lg mb-4">
                By combining these existing technologies with an asset manager, we created a cohesive experience that
                allows users to create their own stories. Simple animations can be made in as little as five minutes,
                making the tool both powerful and user-friendly. Elementary and middle school teachers have shown
                significant interest in the technology, as it empowers students` creativity, enabling them to bring
                their imaginations to life.
            </p>
            <h3 className="text-xl font-semibold my-4" id="conclusion">Conclusion</h3>
            <p className="text-lg mb-4">
                In summary, the Projection Mapping Project was a valuable learning experience in integrating multiple
                technologies to create an educational tool. By making complex animation and storytelling accessible to
                young students, we hope to inspire creativity and enhance learning in K-12 classrooms.
            </p>
            {/*<div className="my-6">*/}
            {/*    <h4 className="text-xl font-semibold my-4">Project Images</h4>*/}
            {/*    /!* Image Template *!/*/}
            {/*    <img src="path/to/your/image.jpg" alt="Description of the image"*/}
            {/*         className="w-full h-auto my-4 rounded shadow-lg"/>*/}
            {/*    <img src="path/to/your/image2.jpg" alt="Description of the image"*/}
            {/*         className="w-full h-auto my-4 rounded shadow-lg"/>*/}
            {/*</div>*/}
            <h3 className="text-xl font-semibold my-4" id="conclusion">Acknowledgements</h3>
            <p className="text-lg mb-4">This project was created my myself and teammates David Zhou, Samira Dang,
                Rumaisa Chowdhury. We would like to
                thank Professor Paul Dietz and our TA Sarah Kushner for their guidance and support during the course of
                this project.
            </p>
        </div>
    );
}
