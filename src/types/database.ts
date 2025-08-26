export interface Database {
  public: {
    Tables: {
      jlpt_levels: {
        Row: {
          id: number;
          level: string;
          description: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          level: string;
          description?: string | null;
          order_index: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          level?: string;
          description?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          user_id: string;
          native_language: string;
          target_jlpt_level: string | null;
          study_goal: string | null;
          notification_preferences: Json;
          theme_preference: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          native_language?: string;
          target_jlpt_level?: string | null;
          study_goal?: string | null;
          notification_preferences?: Json;
          theme_preference?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          native_language?: string;
          target_jlpt_level?: string | null;
          study_goal?: string | null;
          notification_preferences?: Json;
          theme_preference?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          jlpt_level_id: number | null;
          difficulty_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          jlpt_level_id?: number | null;
          difficulty_order: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          jlpt_level_id?: number | null;
          difficulty_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          course_id: string | null;
          title: string;
          description: string | null;
          content: Json | null;
          order_index: number;
          estimated_duration: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id?: string | null;
          title: string;
          description?: string | null;
          content?: Json | null;
          order_index: number;
          estimated_duration?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string | null;
          title?: string;
          description?: string | null;
          content?: Json | null;
          order_index?: number;
          estimated_duration?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      kanji: {
        Row: {
          id: string;
          character: string;
          meaning: string;
          kun_yomi: string[] | null;
          on_yomi: string[] | null;
          stroke_count: number | null;
          jlpt_level_id: number | null;
          radicals: string[] | null;
          examples: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          character: string;
          meaning: string;
          kun_yomi?: string[] | null;
          on_yomi?: string[] | null;
          stroke_count?: number | null;
          jlpt_level_id?: number | null;
          radicals?: string[] | null;
          examples?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          character?: string;
          meaning?: string;
          kun_yomi?: string[] | null;
          on_yomi?: string[] | null;
          stroke_count?: number | null;
          jlpt_level_id?: number | null;
          radicals?: string[] | null;
          examples?: Json | null;
          created_at?: string;
        };
      };
      vocabulary: {
        Row: {
          id: string;
          word: string;
          reading: string | null;
          meaning: string;
          part_of_speech: string | null;
          jlpt_level_id: number | null;
          kanji_breakdown: Json | null;
          examples: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          word: string;
          reading?: string | null;
          meaning: string;
          part_of_speech?: string | null;
          jlpt_level_id?: number | null;
          kanji_breakdown?: Json | null;
          examples?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          word?: string;
          reading?: string | null;
          meaning?: string;
          part_of_speech?: string | null;
          jlpt_level_id?: number | null;
          kanji_breakdown?: Json | null;
          examples?: Json | null;
          created_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          status: string;
          started_at: string | null;
          completed_at: string | null;
          time_spent: number;
          score: number;
          attempts: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          status?: string;
          started_at?: string | null;
          completed_at?: string | null;
          time_spent?: number;
          score?: number;
          attempts?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          status?: string;
          started_at?: string | null;
          completed_at?: string | null;
          time_spent?: number;
          score?: number;
          attempts?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_kanji_progress: {
        Row: {
          id: string;
          user_id: string;
          kanji_id: string;
          status: string;
          confidence_level: number;
          last_reviewed: string | null;
          next_review: string | null;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          kanji_id: string;
          status?: string;
          confidence_level?: number;
          last_reviewed?: string | null;
          next_review?: string | null;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          kanji_id?: string;
          status?: string;
          confidence_level?: number;
          last_reviewed?: string | null;
          next_review?: string | null;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_vocabulary_progress: {
        Row: {
          id: string;
          user_id: string;
          vocabulary_id: string;
          status: string;
          confidence_level: number;
          last_reviewed: string | null;
          next_review: string | null;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          vocabulary_id: string;
          status?: string;
          confidence_level?: number;
          last_reviewed?: string | null;
          next_review?: string | null;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          vocabulary_id?: string;
          status?: string;
          confidence_level?: number;
          last_reviewed?: string | null;
          next_review?: string | null;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      study_sessions: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string | null;
          session_type: string;
          start_time: string;
          end_time: string | null;
          duration: number;
          activities_completed: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id?: string | null;
          session_type: string;
          start_time: string;
          end_time?: string | null;
          duration?: number;
          activities_completed?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string | null;
          session_type?: string;
          start_time?: string;
          end_time?: string | null;
          duration?: number;
          activities_completed?: Json;
          created_at?: string;
        };
      };
      lesson_kanji: {
        Row: {
          lesson_id: string;
          kanji_id: string;
          order_index: number;
        };
        Insert: {
          lesson_id: string;
          kanji_id: string;
          order_index: number;
        };
        Update: {
          lesson_id?: string;
          kanji_id?: string;
          order_index?: number;
        };
      };
      lesson_vocabulary: {
        Row: {
          lesson_id: string;
          vocabulary_id: string;
          order_index: number;
        };
        Insert: {
          lesson_id: string;
          vocabulary_id: string;
          order_index: number;
        };
        Update: {
          lesson_id?: string;
          vocabulary_id?: string;
          order_index?: number;
        };
      };
    };
  };
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Convenience types
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
export type Kanji = Database["public"]["Tables"]["kanji"]["Row"];
export type Vocabulary = Database["public"]["Tables"]["vocabulary"]["Row"];
export type UserProgress = Database["public"]["Tables"]["user_progress"]["Row"];
export type UserKanjiProgress =
  Database["public"]["Tables"]["user_kanji_progress"]["Row"];
export type UserVocabularyProgress =
  Database["public"]["Tables"]["user_vocabulary_progress"]["Row"];
export type StudySession =
  Database["public"]["Tables"]["study_sessions"]["Row"];
export type JLPTLevel = Database["public"]["Tables"]["jlpt_levels"]["Row"];
