import { edit } from '@cloudinary/url-gen/actions/animated';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    commentValue: [],
};

export const commentSlide = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        addCommentToRedux: (state, action) => {
            state.commentValue = action.payload;
        },

        addNewComment: (state, action) => {
            state.commentValue = [...state.commentValue, action.payload];
        },

        editComment: (state, action) => {
            state.commentValue = state.commentValue.map((comment) =>
                comment.id === action.payload.id ? action.payload : comment
            );
        },

        deleteCommentRedux: (state, action) => {
            state.commentValue = state.commentValue.filter(
                (comment) => comment.id !== action.payload
            );
        },
    },
});

export const { addCommentToRedux, resetComment, addNewComment, editComment, deleteCommentRedux } =
    commentSlide.actions;

export default commentSlide.reducer;
