package com.example.fresherwelcome.repository;

import com.example.fresherwelcome.model.FeedbackType;

public interface FeedbackTypeCount {
    FeedbackType getType();
    long getCount();
}
