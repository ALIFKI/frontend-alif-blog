import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createHttpReq from "../../helper/http";

interface Article {
  id: number;
  documentId : string;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: any;
  cover: {
    url: string;
  };
  author: Author;
}

interface Author {
  name : string;
  id : number;
  avatar : {
    url :string
  }

}

export interface DetailArticleResponse {
  data: ArticleDetail;
  meta: unknown;
}

export interface ArticleDetail {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blocks: Block[];
  cover: {
    url : string
  };
  author: Author;
  category : string;
}

export interface Block {
  __component: string;
  id: number;
  body?: string;
  title?: string;
}

interface ArticleResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

interface ArticleState {
  detail_articles : Article | null,
  data: Article[];
    pagination: {
      page : number;
      pageCount : number;
      pageSize : number;
      total : number;
    };
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  detail_articles : null,
  data: [],
  pagination : {
      page : 1,
      pageCount : 1,
      pageSize : 2,
      total : 0
    },
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetch",
  async (number_page : number, { rejectWithValue }) => {
    try {
      const response = await createHttpReq<ArticleResponse>(
        "api/articles?populate[0]=cover&populate[1]=blocks&populate[2]=author.avatar&pagination[page]="+number_page+"&pagination[pageSize]=6",
        {
          method: "GET",
        }
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);


export const getArticleByID = createAsyncThunk("articles/fetchByID",async (documentID : string,{rejectWithValue})=>{
  try {
    const response = await createHttpReq<DetailArticleResponse>(
      "api/articles/" +
        documentID +
        "?populate[0]=cover&populate[1]=blocks&populate[2]=author.avatar&populate[3]=category"
    );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return rejectWithValue(error.response.data);
        }
          return rejectWithValue("An unexpected error occurred");
      }
})

const articleSlice = createSlice({
  name: "articles",
  initialState: initialState, // Explicitly type the initial state
  reducers: {
    setArticles(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        if (action.payload.meta) {
          if (state.pagination.page == action.payload.meta.pagination.page) {
            state.data = action.payload.data;
          } else {
            console.log(action.payload.data, "ini payload data");
            state.data = [...state.data, ...action.payload.data];
          }
        }
        state.pagination = action.payload.meta.pagination;
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Type the payload
      })
      .addCase(getArticleByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArticleByID.fulfilled, (state, action) => {
        state.detail_articles = action.payload.data;
        state.loading = false;
      })
      .addCase(getArticleByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Type the payload
      });;
  },
});


export const { setArticles } = articleSlice.actions;

export default articleSlice.reducer
