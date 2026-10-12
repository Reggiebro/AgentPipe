module type Context = struct 
  private : string;
end

type CommentType = "inline" | "block";

object 
    module TypeContext (Ctx: Context) where
      let context = Ctx.context
        with default_context -> { comments: [], line_offset_start: int, comment_count: int }
        
      type InlineCommentIndex = index.tuple of string * int;
      
      type BlockStartLine = option.int | null;

    module TypeContextBuilder (Ctx: Context) where
      let context = Ctx.context
        with default_context -> { comments: [], line_offset_start: 0, comment_count: 0 }
        
      fun add_comment_type : InlineCommentIndex = 
          { index = _ , type_of_line_index = match 
              if .context.comments < max_comments then (match context.comments with | [] -> -1; | [c] -> c) else (-1);
             end of line_offset_start, comment_count }

      fun add_block : BlockStartLine = null
        
    module TypeContextBuilder2 where
      let context = Ctx.context
        with default_context -> { comments: [], line_offset_start: 0, comment_count: 0 }
        
      type CommentType = "inline" | "block";
      
      fun add_comment_type : InlineCommentIndex = 
          { index = _ , type_of_line_index = match 
              if .context.comments < max_comments then (match context.comments with | [] -> -1; | [c] -> c) else (-1);
             end of line_offset_start, comment_count }

      fun add_block : BlockStartLine = null
      
    module TypeContextBuilder3 where
      let context = Ctx.context
        with default_context -> { comments: [], line_offset_start: 0, comment_count: 0 }
        
      type CommentType = "inline" | "block";
      
      fun add_comment_type : InlineCommentIndex = 
          { index = _ , type_of_line_index = match 
              if .context.comments < max_comments then (match context.comments with | [] -> -1; | [c] -> c) else (-1);
             end of line_offset_start, comment_count }

      fun add_block : BlockStartLine = null
      
    module TypeContextBuilder4 where
      let context = Ctx.context
        with default_context -> { comments: [], line_offset_start: 0, comment_count: 0 }
        
      type CommentType = "inline" | "block";
      
      fun add_comment_type : InlineCommentIndex = 
          { index = _ , type_of_line_index = match 
              if .context.comments < max_comments then (match context.comments with | [] -> -1; | [c] -> c) else (-1);
             end of line_offset_start, comment_count }

      fun add_block : BlockStartLine = null
      
    module TypeContextBuilder5 where
      let context = Ctx.context
        with default_context -> { comments: [], line_offset_start: 0, comment_count: 0 }
        
      type CommentType = "inline" | "block";
      
      fun add_comment_type : InlineCommentIndex = 
          { index = _ , type_of_line_index = match 
              if .context.comments < max_comments then (match context.comments with | [] -> -1; | [c] -> c) else (-1);
             end of line_offset_start, comment_count }

      fun add_block : BlockStartLine = null
      
    module TypeContextBuilder6 where
      let context = Ctx.context
        with default_context -> { comments: [], line_offset_start: 0, comment_count: 0 }
        
      type CommentType = "inline" | "block";
      
      fun add_comment_type : InlineCommentIndex = 
          { index = _ , type_of_line_index = match 
              if .context.comments < max_comments then (match context.comments with | [] -> -1; | [c] -> c) else (-1);
             end of line_offset_start, comment_count }

      fun add_block : BlockStartLine = null
      
    module TypeContextBuilder7 where
      let context = Ctx.context
        with default_context -> { comments: [], line_offset_start: 0, comment_count: 0 }
        
      type CommentType = "inline" | "block";
      
      fun add_comment_type : InlineCommentIndex = 
          { index = _ , type_of_line_index = match 
              if .context.comments < max_comments then (match context.comments with | [] -> -1; | [c] -> c) else (-1);
             end of line_offset_start, comment_count }

      fun add_block : BlockStartLine = null
      
    module TypeContextBuilder8 where
