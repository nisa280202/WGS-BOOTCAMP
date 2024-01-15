import React, { useState } from 'react'
import { CommerceModule, faker } from '@faker-js/faker';

// const Comments = () => {
//     const[like, setLike] = useState(0)

//     let comments = []

//     for (let i = 0; i < 10; i++) {
//         const comment = {
//             randomAvatar : faker.image.avatar(),
//             randomName : faker.person.fullName(),
//             randomDate : faker.date.recent().toLocaleDateString(),
//             randomTime : faker.date.recent().toLocaleTimeString(),
//             randomComment : faker.lorem.text()
//         }

//         comments.push(comment)
//     }

//     return (
//         <div className='ui container comments'>
//             {comments.map((comment) => (
//                 <div className='comment' style={{ marginTop: 20 }}>
//                     <a href="/" className='avatar'>
//                         <img src={comment.randomAvatar} />
//                     </a>

//                     <div className='content'>
//                         <a href="/" className='author'>
//                             {comment.randomName}
//                         </a>

//                         <div className='metadata'>
//                             <span className='date'>{comment.randomDate} at {comment.randomTime}</span>
//                         </div>
//                         <span className='text-black'>| Liked : {like} </span>
//                         <div className='text'>{comment.randomComment}</div>
//                         <button class="ui button small" onClick={() => setLike(like + 1)}>Click Me</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default Comments

class CommentContainer extends React.Component {
    state = {
        like: false,
        jumlahLike: Math.floor(Math.random() * 1000)
    }

    handleLikeChange = () => {
        if (!this.state.like) {
            this.setState({
                like: !this.state.like,
                jumlahLike: this.state.jumlahLike + 1
            })
        } else {
            this.setState({
                like: !this.state.like,
                jumlahLike: this.state.jumlahLike - 1
            })
        }
    }

    handleUnlikeChange = () => {
        if (this.state.like <= 0) {
            this.setState({
                like: 0
            })
        } else {
            this.setState({
                like: this.state.like - 1
            })
        }
    }

    render() {
        return (
            <div className="ui container comments">
                <div className='comment'>
                    <a href="/" className='avatar'>
                        <img alt="avatar" src={this.props.avatar} />
                    </a>

                    <div className='content'>
                        <a href="/" className='author'>
                            {this.props.name}
                        </a>

                        <div className='metadata'>
                            <span className='date'>
                                {this.props.day} at {this.props.time}
                            </span>
                            {/* <span className='text-black'>| Liked : {this.state.like} </span> */}
                        </div>
                        <div className='text'>{this.props.comment}</div>
                        {/* <button className="mini ui pink basic button" onClick={this.handleLikeChange}><i class="heart icon"></i>Like</button>
                        <button className="mini ui gray basic button" onClick={this.handleUnlikeChange}><i class="thumbs down icon"></i>Dislike</button> */}

                        <div class="mini ui labeled button" tabindex="0">
                            <div class={"mini ui " + (this.state.like ? "pink button" : "pink basic button")} onClick={this.handleLikeChange}>
                                <i class="heart icon"></i> Like
                            </div>
                            <a class="ui basic pink left pointing label">
                                {this.state.jumlahLike}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Comments extends React.Component {
    render() {
        let comments = []
    
        for (let i = 0; i < 5; i++) {
            const dataComment = {
                avatar : faker.image.avatar(),
                name : faker.person.fullName(),
                day : faker.date.recent().toLocaleDateString(),
                time : faker.date.recent().toLocaleTimeString(),
                comment : faker.lorem.text()
            }
        
            comments.push(dataComment)
        }

        return(
            <div>
                {comments.map((comment) => (
                    <CommentContainer 
                        avatar={comment.avatar}
                        name={comment.name}
                        day={comment.day}
                        time={comment.time}
                        comment={comment.comment}
                    />
                ))}
            </div>
        )
    }
}

export default Comments