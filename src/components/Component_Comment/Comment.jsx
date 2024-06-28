import { useState } from 'react';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as CommentService from '../../services/CommentService';
import Rating from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { addNewComment, deleteCommentRedux, editComment } from '../../redux/slides/commentSlide';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const Comment = ({ idProduct }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('tokenUser');
    const thisUser = useSelector((state) => state.user);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [commentToEdit, setCommentToEdit] = useState('');
    const [showAllComments, setShowAllComments] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const [rating, setRating] = useState(1);

    // ----------------------- DISPLAY COMMENT ---------------------------
    const dataComment = useSelector((state) => state.comment.commentValue);
    const dataCommentLength = dataComment.length;
    const haveComment = dataComment.length > 0;

    // format date to dd/mm/yyyy
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('T')[0].split('-');
        const day = parts[2];
        const month = parts[1];
        const year = parts[0];
        return `${day}/${month}/${year}`;
    };

    // ----------------------- POST COMMENT --------------------------------
    // mutation post comment
    const mutationPostComment = useMutationHook(({ token, data }) =>
        CommentService.postComment(token, data)
    );

    // handle post comment
    const handlePostComment = () => {
        mutationPostComment.mutate(
            {
                token,
                data: {
                    star: rating,
                    content: commentValue,
                    product: idProduct,
                },
            },
            {
                onSuccess: (res) => {
                    dispatch(
                        addNewComment({
                            user: {
                                avatarImg: thisUser.avatarImg,
                                username: thisUser.username,
                            },
                            star: rating,
                            content: commentValue,
                            createdOn: res.data.createdOn,
                        })
                    );
                    setCommentValue('');
                    setRating(0);
                },
            }
        );
    };

    // ----------------------- EDIT COMMENT ---------------------------
    // handle edit comment modal
    const handleEditComment = (comment) => {
        setCommentToEdit(comment);
        setEditModalVisible(true);
    };

    // mutation edit comment
    const mutationEditComment = useMutationHook(({ token, data }) =>
        CommentService.editComment(token, data)
    );

    // handle edit comment
    const handleSaveEdit = () => {
        mutationEditComment.mutate(
            {
                token,
                data: {
                    id: commentToEdit.id,
                    content: commentToEdit.content,
                },
            },
            {
                onSuccess: (res) => {
                    dispatch(editComment(res.data));
                    setEditModalVisible(false);
                    setCommentToEdit(null);
                },
            }
        );
        setEditModalVisible(false);
        setCommentToEdit(null);
    };

    // ----------------------- DELETE COMMENT ---------------------------
    // mutation delete comment
    const mutationDeleteComment = useMutationHook(({ token, idComment }) =>
        CommentService.deleteComment(token, idComment)
    );

    // handle delete comment
    const handleDeleteComment = (commentId) => {
        dispatch(deleteCommentRedux(commentId));
        toast.success('Đã xóa bình luận của bạn!');
        mutationDeleteComment.mutate({
            token,
            idComment: commentId,
        });
    };

    return (
        <div className='p-5 bg-white rounded-lg shadow-md'>
            <h3 className='text-xl font-bold text-gray-800 mb-4'>
                {dataCommentLength} Lượt đánh giá
            </h3>
            <div className='w-full flex flex-col'>
                {/* post comment */}
                {token && (
                    <div className='w-full'>
                        <div className='flex flex-col items-center'>
                            <div className='w-full flex items-center mb-4'>
                                <div className='flex flex-col items-center w-1/4'>
                                    <span className='text-gray-600 mb-2'>Đánh giá sản phẩm</span>
                                    <Rating
                                        count={5}
                                        size={24}
                                        activeColor='#ffd700'
                                        value={rating}
                                        onChange={(newRating) => setRating(newRating)}
                                    />
                                </div>
                                <input
                                    value={commentValue}
                                    onChange={(e) => setCommentValue(e.target.value)}
                                    type='text'
                                    placeholder='Cho chúng tôi biết suy nghĩ của bạn về sản phẩm'
                                    className='h-12 w-full rounded-l-lg border border-gray-300 px-4 text-gray-700'
                                />
                                <button
                                    onClick={handlePostComment}
                                    className='w-20 h-12 bg-blue-500 rounded-r-lg text-white hover:bg-blue-600 transition-colors'
                                >
                                    Gửi
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* see comment */}
                <div className='w-full mt-5'>
                    {haveComment ? (
                        <>
                            {dataComment
                                .slice(0, showAllComments ? dataComment.length : 3)
                                .map((comment, index) => (
                                    <div key={index} className='flex items-start space-x-3 mb-4'>
                                        <img
                                            src={
                                                comment.user?.avatarImg
                                                    ? comment.user?.avatarImg
                                                    : 'https://i.imgur.com/HeIi0wU.png'
                                            }
                                            alt='User Avatar'
                                            className='w-12 h-12 rounded-full border-2 border-gray-200'
                                        />
                                        <div>
                                            <h4 className='text-sm font-bold text-gray-800'>
                                                {comment.user?.username}
                                            </h4>
                                            <div className='flex items-center space-x-2 mt-1'>
                                                <Rating
                                                    count={5}
                                                    size={16}
                                                    activeColor='#ffd700'
                                                    value={comment.star}
                                                    edit={false}
                                                />
                                                <p className='text-xs ml-2 font-semibold text-gray-600'>
                                                    {formatDate(comment.createdOn)}
                                                </p>
                                                {token && (
                                                    <Button
                                                        onClick={() => handleEditComment(comment)}
                                                        icon={<EditOutlined />}
                                                        className='text-gray-400 hover:text-gray-600'
                                                    >
                                                        Sửa
                                                    </Button>
                                                )}
                                                {token && (
                                                    <Button
                                                        onClick={() =>
                                                            handleDeleteComment(comment.id)
                                                        }
                                                        icon={<DeleteOutlined />}
                                                        className='text-gray-400 hover:text-red-600'
                                                    >
                                                        Xóa
                                                    </Button>
                                                )}
                                            </div>
                                            <p className='text-sm mt-2 text-gray-700'>
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            {dataComment.length > 3 && (
                                <button
                                    onClick={() => setShowAllComments(!showAllComments)}
                                    className='w-full mt-10 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-bold rounded transition-colors'
                                >
                                    {showAllComments ? 'Ẩn bớt bình luận' : 'Đọc thêm bình luận'}
                                </button>
                            )}
                        </>
                    ) : (
                        <p className='flex justify-center text-gray-400 text-lg'>
                            Hiện chưa có bình luận nào cho sản phẩm này.
                        </p>
                    )}
                </div>
            </div>

            {/* Edit Comment Modal */}
            <Modal
                title='Chỉnh sửa bình luận'
                open={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                footer={[
                    <button
                        className='border border-gray-400 py-1 w-20 rounded-md'
                        key='cancel'
                        onClick={() => setEditModalVisible(false)}
                    >
                        Hủy bỏ
                    </button>,
                    <button
                        className='border border-blue-500 py-1 w-20 rounded-md ml-2 bg-blue-500 text-white'
                        key='save'
                        onClick={handleSaveEdit}
                    >
                        Lưu
                    </button>,
                ]}
            >
                <textarea
                    value={commentToEdit?.content || ''}
                    onChange={(e) =>
                        setCommentToEdit((prevComment) => ({
                            ...prevComment,
                            content: e.target.value,
                        }))
                    }
                    className='w-full h-40 border border-gray-300 rounded p-2'
                />
            </Modal>
        </div>
    );
};

export default Comment;
