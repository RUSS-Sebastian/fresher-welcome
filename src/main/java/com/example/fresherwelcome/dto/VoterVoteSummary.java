package com.example.fresherwelcome.dto;

public class VoterVoteSummary {
    private String tnt;
    private String kingName;
    private String queenName;

    public VoterVoteSummary(String tnt, String kingName, String queenName) {
        this.tnt = tnt;
        this.kingName = kingName;
        this.queenName = queenName;
    }

    public VoterVoteSummary() {
    }

    public String getTnt() {
        return tnt;
    }

    public String getKingName() {
        return kingName;
    }

    public String getQueenName() {
        return queenName;
    }

}