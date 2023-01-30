import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({post}) {
  return (
    <div className='card'>
        <div className="card-body">
            <h3 className='card-title'>{post.title}</h3>
            <p className='card-text'>{post.body}</p>
            <Link className='btn btn-primary' to='/'>See More</Link>
        </div>
    </div>
  )
}
