import React from 'react'

export default function PerPost() {
  return (
    <div className="bg-white">
      <div className="flex gap-x-3 mb-2">
        <img src="" alt="username" />
        <div>
          <h5>grace chiome</h5>
          <span>faculty of arts, law department</span>
          <span>24 min, ago</span>
        </div>
      </div>

      <h4>faculty of arts, law department</h4>
      <p>
        All Law students are expected to be have their lectures at Hall 24 of
        the I am particularly drawn to this role because of the opportunity to
        work at [Company Name], an organization whose commitment to innovation
        and sustainability deeply resonates with my personal values. The role’s
        focus on [specific responsibility] excites me, as it aligns perfectly
        with my background in [relevant experience or skill]. I am eager to
        bring my expertise in [specific area] to the team, contributing to
        projects that drive positive change. Furthermore, I am enthusiastic
        about the professional growth opportunities this position offers,
        particularly in [specific area of development]. The company’s
        collaborative culture and emphasis on continuous learning are aspects I
        highly value, and I am eager to be part of a dynamic team where I can
        both contribute and grow.
      </p>
      <span>0 likes</span>
      <div className='flex gap-x-2'>
        <img
          src="\images\like.svg"
          alt="icon"
        />
        <span>like</span>
      </div>
    </div>
  );
}
