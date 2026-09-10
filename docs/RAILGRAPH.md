# Rail graph

Walked from the live engine. Nodes are chair + card + face + ending. Bars and
clocks do not fork the graph. Two live buttons that land on the same next card
are a collapse.

The huge terminal counts are binary trees counting the same shared destinations
over and over. The unique graph is small.

| Chair | Unique nodes | Edges | Terminal path counts |
| --- | --- | --- | --- |
| US | 47 | 84 | 343597383681 |
| Iran | 54 | 87 | 16131314706 |

Collapses: 68 live (playing to the same next card).
Cup continues to the robe. 2026 is history arriving.

Unwired playable from 1953: (none)

Spine still waiting (not a collapse, just not written): (none. The late rail is playable.)

1938 is a year-click egg, not a 1953 button. Hormuz 2019 sits on the walk after Europe bounces.

Purple boxes collapse. Teal boxes actually fork. Red hexes are graves. Green
stadiums are Rail hold.

Solid arrows are golden-path or number-tweak continues. Dotted arrows are AL.

## US at a glance

Year and face only. Full titles in the next diagram.

```mermaid
flowchart TB
  classDef play fill:#1c2333,stroke:#c4a35a,color:#f3ead8
  classDef grave fill:#3a1a1a,stroke:#c45c5c,color:#f3ead8
  classDef hold fill:#1a2e22,stroke:#5d9b6a,color:#f3ead8
  classDef collapse fill:#2a2433,stroke:#8a7bb8,color:#f3ead8
  classDef fork fill:#23333a,stroke:#6ab4c8,color:#f3ead8
  us_coup_1953_us_playing_live_us_back_shah_us_walk["1953 ike"]:::fork
  us_atoms_1957_us_playing_live_us_keep_fuel_us_let_enrich["1957 ike"]:::collapse
  us_coup_1953_us_ended_satrap_1953_{{"1953 satrap_1953"}}:::grave
  us_white_revolution_1963_us_playing_live_us_press_reform_us_send_tanks["1963 kennedy"]:::collapse
  us_sofa_1964_us_playing_live_us_skip_sofa_us_take_sofa["1964 johnson"]:::collapse
  us_sit_nixon_1969_us_playing_live_us_sit_nixon["1969 nixon"]:::play
  us_weapons_1972_us_playing_live_us_blank_check_us_hinterland_first["1972 nixon"]:::collapse
  us_pipeline_1975_us_playing_live_us_keep_selling_us_slow_pipeline["1975 ford"]:::collapse
  us_revolution_1979_us_playing_live_us_admit_shah_us_keep_shah_out["1978–1979 carter"]:::collapse
  us_veil_1979_us_playing_live_us_statement_women_us_stay_out["March 1979 carter"]:::collapse
  us_hostages_1979_us_playing_live_us_eagle_claw_us_keep_talking["November 1979 carter"]:::fork
  us_eagle_claw_1980_us_playing_live_us_see_wreckage["April 1980 carter"]:::play
  us_you_him_fight_1980_us_playing_live_us_let_saddam_us_warn_saddam["Summer 1980 carter"]:::collapse
  us_iran_iraq_1980_us_playing_live_us_no_tilt_us_tilt_iraq["September 1980 carter"]:::collapse
  us_election_1980_us_playing_live_us_hail_mary_us_run_again["November 1980 carter"]:::collapse
  us_inaugurated_1981_us_playing_live_us_sit_reagan["January 1981 reagan"]:::play
  us_tilt_1982_us_playing_live_us_cia_baghdad_us_stay_neutral["1982 reagan"]:::collapse
  us_lebanon_1983_us_playing_live_us_bring_home_us_hit_bekaa["1982–1983 reagan"]:::collapse
  us_iran_contra_1985_us_playing_live_us_keep_embargo_us_sell_missiles["1985–1987 reagan"]:::collapse
  us_cup_1988_us_playing_live_us_call_mistake_us_own_shot["1988 reagan"]:::collapse
  us_robe_1989_us_playing_live_us_no_note_us_note_robe["1989 bush41"]:::collapse
  us_kuwait_1990_us_playing_live_us_go_baghdad_us_stop_border["1990 bush41"]:::collapse
  us_dual_containment_1993_us_playing_live_us_name_both_us_pick_one["1993 clinton"]:::collapse
  us_khobar_1996_us_playing_live_us_no_strike_khobar_us_strike_khobar["1996 clinton"]:::collapse
  us_wall_1997_us_playing_live_us_offer_handshake_us_stay_wall["1997 clinton"]:::collapse
  us_natanz_2002_us_playing_live_us_bin_fax_us_take_fax["2002 bush43"]:::collapse
  us_baghdad_2003_us_playing_live_us_stop_again_us_take_baghdad["2003 bush43"]:::collapse
  us_myth_2005_us_playing_live_us_condemn_myth_us_ignore_myth["2005 bush43"]:::collapse
  us_green_2009_us_playing_live_us_not_own_green_us_own_green["2009 obama"]:::collapse
  us_stuxnet_2010_us_playing_live_us_bomb_natanz_us_worm_run["2010 obama"]:::collapse
  us_jcpoa_2015_us_playing_live_us_sign_jcpoa_us_walk_jcpoa["2015 obama"]:::collapse
  us_white_wednesdays_2017_us_playing_live_us_nothing_white_us_tweet_white["2017 trump"]:::collapse
  us_archive_2018_us_playing_live_us_leave_jcpoa_us_stay_jcpoa["2018 trump"]:::collapse
  us_bounce_2019_us_playing_live_us_offer_back_us_watch_bounce["2019 trump"]:::collapse
  us_hormuz_2019_us_playing_live_us_abort_us_bomb["2019 trump"]:::collapse
  us_soleimani_2020_us_playing_live_us_hold_soleimani_us_kill_soleimani["2020 trump"]:::collapse
  us_abraham_2020_us_playing_live_us_broker_accords_us_skip_accords["2020 trump"]:::collapse
  us_unleave_2021_us_playing_live_us_snap_in_us_talk_forever["2021 biden"]:::collapse
  us_mahsa_2022_us_playing_live_us_own_mahsa_us_statement_mahsa["2022 biden"]:::collapse
  us_saudi_accord_2023_us_playing_live_us_private_saudi_us_public_saudi["2023 biden"]:::fork
  us_oct7_2023_us_playing_live_us_arm_israel_us_go_first["2023 biden"]:::collapse
  us_sit_pezeshkian_2024_us_playing_live_us_sit_2024["2024 biden"]:::play
  us_direct_fire_2024_us_playing_live_us_help_shoot_us_stay_out_fire["2024 biden"]:::collapse
  us_twelve_days_2025_us_playing_live_us_hit_fordow_us_stay_twelve["2025 trump"]:::collapse
  us_the_leader_2026_us_playing_live_us_kill_imam_us_stop_fordow["2026 trump"]:::fork
  us_the_leader_2026_us_ended_the_leader_(["2026 the_leader"]):::hold
  us_the_leader_2026_us_ended_none_(["2026 none"]):::hold
  us_coup_1953_us_playing_live_us_back_shah_us_walk -->|"H Back the Shah (covert)"| us_atoms_1957_us_playing_live_us_keep_fuel_us_let_enrich
  us_coup_1953_us_playing_live_us_back_shah_us_walk -.->|"AL Walk away"| us_coup_1953_us_ended_satrap_1953_
  us_atoms_1957_us_playing_live_us_keep_fuel_us_let_enrich -->|"H Keep sending the fuel"| us_white_revolution_1963_us_playing_live_us_press_reform_us_send_tanks
  us_atoms_1957_us_playing_live_us_keep_fuel_us_let_enrich -->|"Let them run the fuel cycle"| us_white_revolution_1963_us_playing_live_us_press_reform_us_send_tanks
  us_white_revolution_1963_us_playing_live_us_press_reform_us_send_tanks -->|"H Press him to reform"| us_sofa_1964_us_playing_live_us_skip_sofa_us_take_sofa
  us_white_revolution_1963_us_playing_live_us_press_reform_us_send_tanks -->|"Send him tanks instead"| us_sofa_1964_us_playing_live_us_skip_sofa_us_take_sofa
  us_sofa_1964_us_playing_live_us_skip_sofa_us_take_sofa -->|"H Take the immunity"| us_sit_nixon_1969_us_playing_live_us_sit_nixon
  us_sofa_1964_us_playing_live_us_skip_sofa_us_take_sofa -.->|"AL Do not ask for the bill"| us_sit_nixon_1969_us_playing_live_us_sit_nixon
  us_sit_nixon_1969_us_playing_live_us_sit_nixon -->|"H Sit the presidency"| us_weapons_1972_us_playing_live_us_blank_check_us_hinterland_first
  us_weapons_1972_us_playing_live_us_blank_check_us_hinterland_first -->|"H Sign the blank check"| us_pipeline_1975_us_playing_live_us_keep_selling_us_slow_pipeline
  us_weapons_1972_us_playing_live_us_blank_check_us_hinterland_first -->|"Make him spend on the hinterland first"| us_pipeline_1975_us_playing_live_us_keep_selling_us_slow_pipeline
  us_pipeline_1975_us_playing_live_us_keep_selling_us_slow_pipeline -->|"H Keep selling"| us_revolution_1979_us_playing_live_us_admit_shah_us_keep_shah_out
  us_pipeline_1975_us_playing_live_us_keep_selling_us_slow_pipeline -.->|"AL Slow the pipeline"| us_revolution_1979_us_playing_live_us_admit_shah_us_keep_shah_out
  us_revolution_1979_us_playing_live_us_admit_shah_us_keep_shah_out -->|"H Let him in for treatment"| us_veil_1979_us_playing_live_us_statement_women_us_stay_out
  us_revolution_1979_us_playing_live_us_admit_shah_us_keep_shah_out -.->|"AL Keep him out"| us_veil_1979_us_playing_live_us_statement_women_us_stay_out
  us_veil_1979_us_playing_live_us_statement_women_us_stay_out -->|"Issue a statement"| us_hostages_1979_us_playing_live_us_eagle_claw_us_keep_talking
  us_veil_1979_us_playing_live_us_statement_women_us_stay_out -->|"H Stay out"| us_hostages_1979_us_playing_live_us_eagle_claw_us_keep_talking
  us_hostages_1979_us_playing_live_us_eagle_claw_us_keep_talking -->|"H Authorize a rescue"| us_eagle_claw_1980_us_playing_live_us_see_wreckage
  us_hostages_1979_us_playing_live_us_eagle_claw_us_keep_talking -.->|"AL Keep talking"| us_you_him_fight_1980_us_playing_live_us_let_saddam_us_warn_saddam
  us_eagle_claw_1980_us_playing_live_us_see_wreckage -->|"H The hostages are still inside"| us_you_him_fight_1980_us_playing_live_us_let_saddam_us_warn_saddam
  us_you_him_fight_1980_us_playing_live_us_let_saddam_us_warn_saddam -->|"H Stay out of the way"| us_iran_iraq_1980_us_playing_live_us_no_tilt_us_tilt_iraq
  us_you_him_fight_1980_us_playing_live_us_let_saddam_us_warn_saddam -.->|"AL Tell Saddam no"| us_iran_iraq_1980_us_playing_live_us_no_tilt_us_tilt_iraq
  us_iran_iraq_1980_us_playing_live_us_no_tilt_us_tilt_iraq -.->|"AL Tilt to Iraq"| us_election_1980_us_playing_live_us_hail_mary_us_run_again
  us_iran_iraq_1980_us_playing_live_us_no_tilt_us_tilt_iraq -->|"H Stay out of the war"| us_election_1980_us_playing_live_us_hail_mary_us_run_again
  us_election_1980_us_playing_live_us_hail_mary_us_run_again -->|"H Run again"| us_inaugurated_1981_us_playing_live_us_sit_reagan
  us_election_1980_us_playing_live_us_hail_mary_us_run_again -.->|"AL Throw a Hail Mary"| us_inaugurated_1981_us_playing_live_us_sit_reagan
  us_inaugurated_1981_us_playing_live_us_sit_reagan -->|"H Sit the presidency"| us_tilt_1982_us_playing_live_us_cia_baghdad_us_stay_neutral
  us_tilt_1982_us_playing_live_us_cia_baghdad_us_stay_neutral -->|"H Share the intel with Baghdad"| us_lebanon_1983_us_playing_live_us_bring_home_us_hit_bekaa
  us_tilt_1982_us_playing_live_us_cia_baghdad_us_stay_neutral -.->|"AL Stay out of the war"| us_lebanon_1983_us_playing_live_us_bring_home_us_hit_bekaa
  us_lebanon_1983_us_playing_live_us_bring_home_us_hit_bekaa -->|"H Bring them home"| us_iran_contra_1985_us_playing_live_us_keep_embargo_us_sell_missiles
  us_lebanon_1983_us_playing_live_us_bring_home_us_hit_bekaa -.->|"AL Stay and hit the Bekaa"| us_iran_contra_1985_us_playing_live_us_keep_embargo_us_sell_missiles
  us_iran_contra_1985_us_playing_live_us_keep_embargo_us_sell_missiles -->|"H Sell them the missiles"| us_cup_1988_us_playing_live_us_call_mistake_us_own_shot
  us_iran_contra_1985_us_playing_live_us_keep_embargo_us_sell_missiles -.->|"AL Keep the embargo"| us_cup_1988_us_playing_live_us_call_mistake_us_own_shot
  us_cup_1988_us_playing_live_us_call_mistake_us_own_shot -->|"H Call it a mistake"| us_robe_1989_us_playing_live_us_no_note_us_note_robe
  us_cup_1988_us_playing_live_us_call_mistake_us_own_shot -.->|"AL Own the shot"| us_robe_1989_us_playing_live_us_no_note_us_note_robe
  us_robe_1989_us_playing_live_us_no_note_us_note_robe -->|"H Send a note"| us_kuwait_1990_us_playing_live_us_go_baghdad_us_stop_border
  us_robe_1989_us_playing_live_us_no_note_us_note_robe -->|"Do not send a note"| us_kuwait_1990_us_playing_live_us_go_baghdad_us_stop_border
  us_kuwait_1990_us_playing_live_us_go_baghdad_us_stop_border -->|"H Stop at the border"| us_dual_containment_1993_us_playing_live_us_name_both_us_pick_one
  us_kuwait_1990_us_playing_live_us_go_baghdad_us_stop_border -.->|"AL Go to Baghdad"| us_dual_containment_1993_us_playing_live_us_name_both_us_pick_one
  us_dual_containment_1993_us_playing_live_us_name_both_us_pick_one -->|"H Name both as the problem"| us_khobar_1996_us_playing_live_us_no_strike_khobar_us_strike_khobar
  us_dual_containment_1993_us_playing_live_us_name_both_us_pick_one -->|"Pick one"| us_khobar_1996_us_playing_live_us_no_strike_khobar_us_strike_khobar
  us_khobar_1996_us_playing_live_us_no_strike_khobar_us_strike_khobar -->|"H Do not strike"| us_wall_1997_us_playing_live_us_offer_handshake_us_stay_wall
  us_khobar_1996_us_playing_live_us_no_strike_khobar_us_strike_khobar -.->|"AL Strike"| us_wall_1997_us_playing_live_us_offer_handshake_us_stay_wall
  us_wall_1997_us_playing_live_us_offer_handshake_us_stay_wall -->|"H Offer the handshake"| us_natanz_2002_us_playing_live_us_bin_fax_us_take_fax
  us_wall_1997_us_playing_live_us_offer_handshake_us_stay_wall -->|"Stay behind the wall"| us_natanz_2002_us_playing_live_us_bin_fax_us_take_fax
  us_natanz_2002_us_playing_live_us_bin_fax_us_take_fax -->|"H Bin the fax"| us_baghdad_2003_us_playing_live_us_stop_again_us_take_baghdad
  us_natanz_2002_us_playing_live_us_bin_fax_us_take_fax -.->|"AL Take the fax"| us_baghdad_2003_us_playing_live_us_stop_again_us_take_baghdad
  us_baghdad_2003_us_playing_live_us_stop_again_us_take_baghdad -->|"H Take Baghdad"| us_myth_2005_us_playing_live_us_condemn_myth_us_ignore_myth
  us_baghdad_2003_us_playing_live_us_stop_again_us_take_baghdad -->|"Stop at the border again"| us_myth_2005_us_playing_live_us_condemn_myth_us_ignore_myth
  us_myth_2005_us_playing_live_us_condemn_myth_us_ignore_myth -->|"H Condemn"| us_green_2009_us_playing_live_us_not_own_green_us_own_green
  us_myth_2005_us_playing_live_us_condemn_myth_us_ignore_myth -->|"Ignore"| us_green_2009_us_playing_live_us_not_own_green_us_own_green
  us_green_2009_us_playing_live_us_not_own_green_us_own_green -->|"H Do not own the street"| us_stuxnet_2010_us_playing_live_us_bomb_natanz_us_worm_run
  us_green_2009_us_playing_live_us_not_own_green_us_own_green -.->|"AL Own the street"| us_stuxnet_2010_us_playing_live_us_bomb_natanz_us_worm_run
  us_stuxnet_2010_us_playing_live_us_bomb_natanz_us_worm_run -->|"H Let the worm run"| us_jcpoa_2015_us_playing_live_us_sign_jcpoa_us_walk_jcpoa
  us_stuxnet_2010_us_playing_live_us_bomb_natanz_us_worm_run -.->|"AL Bomb instead"| us_jcpoa_2015_us_playing_live_us_sign_jcpoa_us_walk_jcpoa
  us_jcpoa_2015_us_playing_live_us_sign_jcpoa_us_walk_jcpoa -->|"H Sign the JCPOA"| us_white_wednesdays_2017_us_playing_live_us_nothing_white_us_tweet_white
  us_jcpoa_2015_us_playing_live_us_sign_jcpoa_us_walk_jcpoa -.->|"AL Walk away"| us_white_wednesdays_2017_us_playing_live_us_nothing_white_us_tweet_white
  us_white_wednesdays_2017_us_playing_live_us_nothing_white_us_tweet_white -->|"H Tweet"| us_archive_2018_us_playing_live_us_leave_jcpoa_us_stay_jcpoa
  us_white_wednesdays_2017_us_playing_live_us_nothing_white_us_tweet_white -->|"Do nothing"| us_archive_2018_us_playing_live_us_leave_jcpoa_us_stay_jcpoa
  us_archive_2018_us_playing_live_us_leave_jcpoa_us_stay_jcpoa -->|"H Leave the JCPOA"| us_bounce_2019_us_playing_live_us_offer_back_us_watch_bounce
  us_archive_2018_us_playing_live_us_leave_jcpoa_us_stay_jcpoa -.->|"AL Stay in the JCPOA"| us_bounce_2019_us_playing_live_us_offer_back_us_watch_bounce
  us_bounce_2019_us_playing_live_us_offer_back_us_watch_bounce -->|"H Watch"| us_hormuz_2019_us_playing_live_us_abort_us_bomb
  us_bounce_2019_us_playing_live_us_offer_back_us_watch_bounce -->|"Offer a ladder"| us_hormuz_2019_us_playing_live_us_abort_us_bomb
  us_hormuz_2019_us_playing_live_us_abort_us_bomb -->|"H Call it off"| us_soleimani_2020_us_playing_live_us_hold_soleimani_us_kill_soleimani
  us_hormuz_2019_us_playing_live_us_abort_us_bomb -->|"Take the shot"| us_soleimani_2020_us_playing_live_us_hold_soleimani_us_kill_soleimani
  us_soleimani_2020_us_playing_live_us_hold_soleimani_us_kill_soleimani -->|"H Kill him"| us_abraham_2020_us_playing_live_us_broker_accords_us_skip_accords
  us_soleimani_2020_us_playing_live_us_hold_soleimani_us_kill_soleimani -.->|"AL Hold the shot"| us_abraham_2020_us_playing_live_us_broker_accords_us_skip_accords
  us_abraham_2020_us_playing_live_us_broker_accords_us_skip_accords -->|"H Broker the Accords"| us_unleave_2021_us_playing_live_us_snap_in_us_talk_forever
  us_abraham_2020_us_playing_live_us_broker_accords_us_skip_accords -.->|"AL Leave the boycott in place"| us_unleave_2021_us_playing_live_us_snap_in_us_talk_forever
  us_unleave_2021_us_playing_live_us_snap_in_us_talk_forever -->|"H Talk forever"| us_mahsa_2022_us_playing_live_us_own_mahsa_us_statement_mahsa
  us_unleave_2021_us_playing_live_us_snap_in_us_talk_forever -.->|"AL Snap back in"| us_mahsa_2022_us_playing_live_us_own_mahsa_us_statement_mahsa
  us_mahsa_2022_us_playing_live_us_own_mahsa_us_statement_mahsa -->|"H Issue a statement"| us_saudi_accord_2023_us_playing_live_us_private_saudi_us_public_saudi
  us_mahsa_2022_us_playing_live_us_own_mahsa_us_statement_mahsa -.->|"AL Own the street"| us_saudi_accord_2023_us_playing_live_us_private_saudi_us_public_saudi
  us_saudi_accord_2023_us_playing_live_us_private_saudi_us_public_saudi -->|"H Do the talks in public"| us_oct7_2023_us_playing_live_us_arm_israel_us_go_first
  us_saudi_accord_2023_us_playing_live_us_private_saudi_us_public_saudi -.->|"AL Do the talks in private"| us_sit_pezeshkian_2024_us_playing_live_us_sit_2024
  us_oct7_2023_us_playing_live_us_arm_israel_us_go_first -->|"H Arm Israel"| us_direct_fire_2024_us_playing_live_us_help_shoot_us_stay_out_fire
  us_oct7_2023_us_playing_live_us_arm_israel_us_go_first -->|"Go first"| us_direct_fire_2024_us_playing_live_us_help_shoot_us_stay_out_fire
  us_sit_pezeshkian_2024_us_playing_live_us_sit_2024 -->|"H Note the crash"| us_twelve_days_2025_us_playing_live_us_hit_fordow_us_stay_twelve
  us_direct_fire_2024_us_playing_live_us_help_shoot_us_stay_out_fire -->|"H Help shoot them down"| us_sit_pezeshkian_2024_us_playing_live_us_sit_2024
  us_direct_fire_2024_us_playing_live_us_help_shoot_us_stay_out_fire -->|"Stay out"| us_sit_pezeshkian_2024_us_playing_live_us_sit_2024
  us_twelve_days_2025_us_playing_live_us_hit_fordow_us_stay_twelve -->|"H Hit Fordow"| us_the_leader_2026_us_playing_live_us_kill_imam_us_stop_fordow
  us_twelve_days_2025_us_playing_live_us_hit_fordow_us_stay_twelve -.->|"AL Stay out of Israel's war"| us_the_leader_2026_us_playing_live_us_kill_imam_us_stop_fordow
  us_the_leader_2026_us_playing_live_us_kill_imam_us_stop_fordow -->|"H Run the campaign"| us_the_leader_2026_us_ended_the_leader_
  us_the_leader_2026_us_playing_live_us_kill_imam_us_stop_fordow -.->|"AL Stop after Fordow"| us_the_leader_2026_us_ended_none_
```

## Iran at a glance

Mossadegh can keep the chair by dealing with London. That costume runs through
Nixon, then 1979 still seats Bazargan.

```mermaid
flowchart TB
  classDef play fill:#1c2333,stroke:#c4a35a,color:#f3ead8
  classDef grave fill:#3a1a1a,stroke:#c45c5c,color:#f3ead8
  classDef hold fill:#1a2e22,stroke:#5d9b6a,color:#f3ead8
  classDef collapse fill:#2a2433,stroke:#8a7bb8,color:#f3ead8
  classDef fork fill:#23333a,stroke:#6ab4c8,color:#f3ead8
  iran_coup_1953_mossadegh_playing_live_ir_deal_london_ir_deal_moscow_ir_nationalize["1953 mossadegh"]:::fork
  iran_deposed_1953_shah_playing_live_ir_sit_throne["1953 shah"]:::play
  iran_coup_1953_mossadegh_ended_mossadegh_street_{{"1953 mossadegh_street"}}:::grave
  iran_coup_1953_mossadegh_ended_mossadegh_falls_{{"1953 mossadegh_falls"}}:::grave
  iran_atoms_1957_shah_playing_live_ir_shah_fuel_ir_shah_plant["1957 shah"]:::collapse
  iran_white_revolution_1963_shah_playing_live_ir_keep_quiet_ir_white_rev["1963 shah"]:::collapse
  iran_sofa_1964_shah_playing_live_ir_pass_sofa_ir_refuse_sofa["1964 shah"]:::collapse
  iran_sit_nixon_1969_shah_playing_live_ir_nixon_next["1969 shah"]:::play
  iran_weapons_1972_shah_playing_live_ir_buy_catalog_ir_spend_villages["1972 shah"]:::collapse
  iran_pipeline_1975_shah_playing_live_ir_keep_catalog_ir_villages_again["1975 shah"]:::fork
  iran_revolution_1979_shah_playing_live_ir_fire_crowd_ir_shah_leave["1978–1979 shah"]:::collapse
  iran_revolution_1979_shah_playing_live_ir_shah_hold_ir_shah_leave["1978–1979 shah"]:::fork
  iran_veil_1979_bazargan_playing_live_ir_keep_fpl_ir_repeal_fpl["March 1979 bazargan"]:::collapse
  iran_revolution_1979_shah_ended_shah_holds_(["1978–1979 shah_holds"]):::hold
  iran_hostages_1979_bazargan_playing_live_ir_demand_leave_ir_let_students["November 1979 bazargan"]:::collapse
  iran_resigned_1979_banisadr_playing_live_ir_refuse_letterhead_ir_sit_presidency["November 1979 banisadr"]:::collapse
  iran_you_him_fight_1980_banisadr_playing_live_ir_watch_lineup["Summer 1980 banisadr"]:::play
  iran_iran_iraq_1980_banisadr_playing_live_ir_artesh_war_ir_guards_war["September 1980 banisadr"]:::collapse
  iran_impeached_1981_banisadr_playing_live_ir_defy_majles_ir_leave_majles["June 1981 banisadr"]:::collapse
  iran_seated_1981_khamenei_playing_live_ir_refuse_khamenei_ir_sit_khamenei["October 1981 khamenei"]:::collapse
  iran_lebanon_1983_khamenei_playing_live_ir_bekah_ir_no_export["1982–1983 khamenei"]:::fork
  iran_iran_contra_1985_khamenei_playing_live_ir_refuse_crates_ir_take_parts["1985–1987 khamenei"]:::collapse
  iran_lebanon_1983_khamenei_ended_face_no_guns_{{"1982–1983 face_no_guns"}}:::grave
  iran_cup_1988_khamenei_playing_live_ir_refuse_cup_ir_stamp_cup["1988 khamenei"]:::fork
  iran_robe_1989_khamenei_playing_live_ir_remain_letterhead_ir_take_robe["1989 khamenei"]:::collapse
  iran_cup_1988_khamenei_ended_face_no_guns_{{"1988 face_no_guns"}}:::grave
  iran_kuwait_1990_rafsanjani_playing_live_ir_side_saddam_ir_stay_out_kuwait["1990 rafsanjani"]:::fork
  iran_dual_containment_1993_rafsanjani_playing_live_ir_rebuild_ir_stay_loud["1993 rafsanjani"]:::collapse
  iran_kuwait_1990_rafsanjani_ended_kuwait_grave_{{"1990 kuwait_grave"}}:::grave
  iran_khobar_1996_rafsanjani_playing_live_ir_deny_khobar_ir_own_khobar["1996 rafsanjani"]:::collapse
  iran_wall_1997_rafsanjani_playing_live_ir_cnn_ir_meet_secretary["1997 rafsanjani"]:::collapse
  iran_natanz_2002_khatami_playing_live_ir_keep_spinning_ir_pause_natanz["2002 khatami"]:::collapse
  iran_baghdad_2003_khatami_playing_live_ir_send_militias_ir_watch_baghdad["2003 khatami"]:::collapse
  iran_myth_2005_khatami_playing_live_ir_dont_say_myth_ir_say_myth["2005 khatami"]:::collapse
  iran_green_2009_ahmadinejad_playing_live_ir_count_green_ir_crush_green["2009 ahmadinejad"]:::collapse
  iran_stuxnet_2010_ahmadinejad_playing_live_ir_keep_spin_stux_ir_pause_stux["2010 ahmadinejad"]:::collapse
  iran_jcpoa_2015_ahmadinejad_playing_live_ir_accept_jcpoa_ir_keep_spin_jcpoa["2015 ahmadinejad"]:::collapse
  iran_white_wednesdays_2017_rouhani_playing_live_ir_arrest_white_ir_let_post["2017 rouhani"]:::collapse
  iran_archive_2018_rouhani_playing_live_ir_sprint_tonight_ir_wait_europe["2018 rouhani"]:::collapse
  iran_bounce_2019_rouhani_playing_live_ir_keep_limits_ir_step_off["2019 rouhani"]:::fork
  iran_hormuz_2019_rouhani_playing_live_ir_hold_fire_ir_squeeze["2019 rouhani"]:::collapse
  iran_bounce_2019_rouhani_ended_jcpoa_holds_(["2019 jcpoa_holds"]):::hold
  iran_soleimani_2020_rouhani_playing_live_ir_eat_airport_ir_missiles_752["2020 rouhani"]:::collapse
  iran_abraham_2020_rouhani_playing_live_ir_drop_quds_ir_keep_quds["2020 rouhani"]:::collapse
  iran_unleave_2021_rouhani_playing_live_ir_sprint_unleave_ir_talk_unleave["2021 rouhani"]:::collapse
  iran_mahsa_2022_raisi_playing_live_ir_crush_mahsa_ir_fire_morality["2022 raisi"]:::collapse
  iran_saudi_accord_2023_raisi_playing_live_ir_fund_hamas_ir_leave_hamas["2023 raisi"]:::fork
  iran_oct7_2023_raisi_playing_live_ir_keep_layer_ir_shoot_now["2023 raisi"]:::collapse
  iran_sit_pezeshkian_2024_raisi_playing_live_ir_sit_pezeshkian["2024 raisi"]:::play
  iran_direct_fire_2024_raisi_playing_live_ir_fire_iran_ir_stay_proxies["2024 raisi"]:::collapse
  iran_twelve_days_2025_pezeshkian_playing_live_ir_absorb_strike_ir_deal_now["2025 pezeshkian"]:::collapse
  iran_the_leader_2026_pezeshkian_playing_live_ir_hormuz_memo_ir_keep_war["2026 pezeshkian"]:::fork
  iran_the_leader_2026_pezeshkian_ended_the_leader_(["2026 the_leader"]):::hold
  iran_the_leader_2026_pezeshkian_ended_keep_the_war_{{"2026 keep_the_war"}}:::grave
  iran_coup_1953_mossadegh_playing_live_ir_deal_london_ir_deal_moscow_ir_nationalize -->|"H Nationalize and ride the crowd =  shah"| iran_deposed_1953_shah_playing_live_ir_sit_throne
  iran_coup_1953_mossadegh_playing_live_ir_deal_london_ir_deal_moscow_ir_nationalize -.->|"AL Hire the British engineers"| iran_coup_1953_mossadegh_ended_mossadegh_street_
  iran_coup_1953_mossadegh_playing_live_ir_deal_london_ir_deal_moscow_ir_nationalize -.->|"AL Cut a deal with Moscow"| iran_coup_1953_mossadegh_ended_mossadegh_falls_
  iran_deposed_1953_shah_playing_live_ir_sit_throne -->|"H Sit the throne"| iran_atoms_1957_shah_playing_live_ir_shah_fuel_ir_shah_plant
  iran_atoms_1957_shah_playing_live_ir_shah_fuel_ir_shah_plant -->|"H Take the American fuel"| iran_white_revolution_1963_shah_playing_live_ir_keep_quiet_ir_white_rev
  iran_atoms_1957_shah_playing_live_ir_shah_fuel_ir_shah_plant -->|"Talk about a national plant"| iran_white_revolution_1963_shah_playing_live_ir_keep_quiet_ir_white_rev
  iran_white_revolution_1963_shah_playing_live_ir_keep_quiet_ir_white_rev -->|"H Launch the White Revolution"| iran_sofa_1964_shah_playing_live_ir_pass_sofa_ir_refuse_sofa
  iran_white_revolution_1963_shah_playing_live_ir_keep_quiet_ir_white_rev -->|"Keep the landlords and the clergy quiet"| iran_sofa_1964_shah_playing_live_ir_pass_sofa_ir_refuse_sofa
  iran_sofa_1964_shah_playing_live_ir_pass_sofa_ir_refuse_sofa -->|"H Pass the bill"| iran_sit_nixon_1969_shah_playing_live_ir_nixon_next
  iran_sofa_1964_shah_playing_live_ir_pass_sofa_ir_refuse_sofa -.->|"AL Refuse Washington"| iran_sit_nixon_1969_shah_playing_live_ir_nixon_next
  iran_sit_nixon_1969_shah_playing_live_ir_nixon_next -->|"H Keep buying"| iran_weapons_1972_shah_playing_live_ir_buy_catalog_ir_spend_villages
  iran_weapons_1972_shah_playing_live_ir_buy_catalog_ir_spend_villages -->|"H Buy the American catalog"| iran_pipeline_1975_shah_playing_live_ir_keep_catalog_ir_villages_again
  iran_weapons_1972_shah_playing_live_ir_buy_catalog_ir_spend_villages -.->|"AL Spend the oil on the villages"| iran_pipeline_1975_shah_playing_live_ir_keep_catalog_ir_villages_again
  iran_pipeline_1975_shah_playing_live_ir_keep_catalog_ir_villages_again -->|"H Keep buying"| iran_revolution_1979_shah_playing_live_ir_fire_crowd_ir_shah_leave
  iran_pipeline_1975_shah_playing_live_ir_keep_catalog_ir_villages_again -->|"Spend on the villages"| iran_revolution_1979_shah_playing_live_ir_shah_hold_ir_shah_leave
  iran_revolution_1979_shah_playing_live_ir_fire_crowd_ir_shah_leave -->|"Fire on the crowd =  bazargan"| iran_veil_1979_bazargan_playing_live_ir_keep_fpl_ir_repeal_fpl
  iran_revolution_1979_shah_playing_live_ir_fire_crowd_ir_shah_leave -->|"H Leave =  bazargan"| iran_veil_1979_bazargan_playing_live_ir_keep_fpl_ir_repeal_fpl
  iran_revolution_1979_shah_playing_live_ir_shah_hold_ir_shah_leave -->|"H Leave =  bazargan"| iran_veil_1979_bazargan_playing_live_ir_keep_fpl_ir_repeal_fpl
  iran_revolution_1979_shah_playing_live_ir_shah_hold_ir_shah_leave -.->|"AL Stay. The villages are quiet."| iran_revolution_1979_shah_ended_shah_holds_
  iran_veil_1979_bazargan_playing_live_ir_keep_fpl_ir_repeal_fpl -.->|"AL Keep the Family Protection Law"| iran_hostages_1979_bazargan_playing_live_ir_demand_leave_ir_let_students
  iran_veil_1979_bazargan_playing_live_ir_keep_fpl_ir_repeal_fpl -->|"H Let the Imam repeal it"| iran_hostages_1979_bazargan_playing_live_ir_demand_leave_ir_let_students
  iran_hostages_1979_bazargan_playing_live_ir_demand_leave_ir_let_students -->|"H Demand they leave =  banisadr"| iran_resigned_1979_banisadr_playing_live_ir_refuse_letterhead_ir_sit_presidency
  iran_hostages_1979_bazargan_playing_live_ir_demand_leave_ir_let_students -.->|"AL Let the students hold it =  banisadr"| iran_resigned_1979_banisadr_playing_live_ir_refuse_letterhead_ir_sit_presidency
  iran_resigned_1979_banisadr_playing_live_ir_refuse_letterhead_ir_sit_presidency -->|"H Sit the presidency"| iran_you_him_fight_1980_banisadr_playing_live_ir_watch_lineup
  iran_resigned_1979_banisadr_playing_live_ir_refuse_letterhead_ir_sit_presidency -.->|"AL Refuse the letterhead"| iran_you_him_fight_1980_banisadr_playing_live_ir_watch_lineup
  iran_you_him_fight_1980_banisadr_playing_live_ir_watch_lineup -->|"H Watch the neighborhood line up"| iran_iran_iraq_1980_banisadr_playing_live_ir_artesh_war_ir_guards_war
  iran_iran_iraq_1980_banisadr_playing_live_ir_artesh_war_ir_guards_war -->|"H Let the Guards have the war"| iran_impeached_1981_banisadr_playing_live_ir_defy_majles_ir_leave_majles
  iran_iran_iraq_1980_banisadr_playing_live_ir_artesh_war_ir_guards_war -.->|"AL Keep the regular army in command"| iran_impeached_1981_banisadr_playing_live_ir_defy_majles_ir_leave_majles
  iran_impeached_1981_banisadr_playing_live_ir_defy_majles_ir_leave_majles -->|"H Leave the chair =  khamenei"| iran_seated_1981_khamenei_playing_live_ir_refuse_khamenei_ir_sit_khamenei
  iran_impeached_1981_banisadr_playing_live_ir_defy_majles_ir_leave_majles -.->|"AL Defy the Majlis =  khamenei"| iran_seated_1981_khamenei_playing_live_ir_refuse_khamenei_ir_sit_khamenei
  iran_seated_1981_khamenei_playing_live_ir_refuse_khamenei_ir_sit_khamenei -->|"H Sit the presidency"| iran_lebanon_1983_khamenei_playing_live_ir_bekah_ir_no_export
  iran_seated_1981_khamenei_playing_live_ir_refuse_khamenei_ir_sit_khamenei -.->|"AL Refuse the letterhead"| iran_lebanon_1983_khamenei_playing_live_ir_bekah_ir_no_export
  iran_lebanon_1983_khamenei_playing_live_ir_bekah_ir_no_export -->|"H Send the Guards to the Bekaa"| iran_iran_contra_1985_khamenei_playing_live_ir_refuse_crates_ir_take_parts
  iran_lebanon_1983_khamenei_playing_live_ir_bekah_ir_no_export -.->|"AL Keep the war at home"| iran_lebanon_1983_khamenei_ended_face_no_guns_
  iran_iran_contra_1985_khamenei_playing_live_ir_refuse_crates_ir_take_parts -->|"H Take the American parts"| iran_cup_1988_khamenei_playing_live_ir_refuse_cup_ir_stamp_cup
  iran_iran_contra_1985_khamenei_playing_live_ir_refuse_crates_ir_take_parts -.->|"AL Refuse the crates"| iran_cup_1988_khamenei_playing_live_ir_refuse_cup_ir_stamp_cup
  iran_cup_1988_khamenei_playing_live_ir_refuse_cup_ir_stamp_cup -->|"H Stamp the cup"| iran_robe_1989_khamenei_playing_live_ir_remain_letterhead_ir_take_robe
  iran_cup_1988_khamenei_playing_live_ir_refuse_cup_ir_stamp_cup -.->|"AL Refuse the ceasefire"| iran_cup_1988_khamenei_ended_face_no_guns_
  iran_robe_1989_khamenei_playing_live_ir_remain_letterhead_ir_take_robe -->|"H Take the robe =  rafsanjani"| iran_kuwait_1990_rafsanjani_playing_live_ir_side_saddam_ir_stay_out_kuwait
  iran_robe_1989_khamenei_playing_live_ir_remain_letterhead_ir_take_robe -->|"Remain president =  rafsanjani"| iran_kuwait_1990_rafsanjani_playing_live_ir_side_saddam_ir_stay_out_kuwait
  iran_kuwait_1990_rafsanjani_playing_live_ir_side_saddam_ir_stay_out_kuwait -->|"H Stay out"| iran_dual_containment_1993_rafsanjani_playing_live_ir_rebuild_ir_stay_loud
  iran_kuwait_1990_rafsanjani_playing_live_ir_side_saddam_ir_stay_out_kuwait -->|"Side with Saddam"| iran_kuwait_1990_rafsanjani_ended_kuwait_grave_
  iran_dual_containment_1993_rafsanjani_playing_live_ir_rebuild_ir_stay_loud -->|"H Rebuild"| iran_khobar_1996_rafsanjani_playing_live_ir_deny_khobar_ir_own_khobar
  iran_dual_containment_1993_rafsanjani_playing_live_ir_rebuild_ir_stay_loud -->|"Keep the revolution loud"| iran_khobar_1996_rafsanjani_playing_live_ir_deny_khobar_ir_own_khobar
  iran_khobar_1996_rafsanjani_playing_live_ir_deny_khobar_ir_own_khobar -->|"H Deny"| iran_wall_1997_rafsanjani_playing_live_ir_cnn_ir_meet_secretary
  iran_khobar_1996_rafsanjani_playing_live_ir_deny_khobar_ir_own_khobar -->|"Own it"| iran_wall_1997_rafsanjani_playing_live_ir_cnn_ir_meet_secretary
  iran_wall_1997_rafsanjani_playing_live_ir_cnn_ir_meet_secretary -->|"H Talk to the people =  khatami"| iran_natanz_2002_khatami_playing_live_ir_keep_spinning_ir_pause_natanz
  iran_wall_1997_rafsanjani_playing_live_ir_cnn_ir_meet_secretary -.->|"AL Meet the Secretary =  khatami"| iran_natanz_2002_khatami_playing_live_ir_keep_spinning_ir_pause_natanz
  iran_natanz_2002_khatami_playing_live_ir_keep_spinning_ir_pause_natanz -->|"H Keep spinning"| iran_baghdad_2003_khatami_playing_live_ir_send_militias_ir_watch_baghdad
  iran_natanz_2002_khatami_playing_live_ir_keep_spinning_ir_pause_natanz -.->|"AL Pause"| iran_baghdad_2003_khatami_playing_live_ir_send_militias_ir_watch_baghdad
  iran_baghdad_2003_khatami_playing_live_ir_send_militias_ir_watch_baghdad -->|"H Watch"| iran_myth_2005_khatami_playing_live_ir_dont_say_myth_ir_say_myth
  iran_baghdad_2003_khatami_playing_live_ir_send_militias_ir_watch_baghdad -->|"Send the militias now"| iran_myth_2005_khatami_playing_live_ir_dont_say_myth_ir_say_myth
  iran_myth_2005_khatami_playing_live_ir_dont_say_myth_ir_say_myth -->|"H Say it =  ahmadinejad"| iran_green_2009_ahmadinejad_playing_live_ir_count_green_ir_crush_green
  iran_myth_2005_khatami_playing_live_ir_dont_say_myth_ir_say_myth -->|"Do not say it =  ahmadinejad"| iran_green_2009_ahmadinejad_playing_live_ir_count_green_ir_crush_green
  iran_green_2009_ahmadinejad_playing_live_ir_count_green_ir_crush_green -->|"H Steal it and crush it"| iran_stuxnet_2010_ahmadinejad_playing_live_ir_keep_spin_stux_ir_pause_stux
  iran_green_2009_ahmadinejad_playing_live_ir_count_green_ir_crush_green -->|"Count the votes"| iran_stuxnet_2010_ahmadinejad_playing_live_ir_keep_spin_stux_ir_pause_stux
  iran_stuxnet_2010_ahmadinejad_playing_live_ir_keep_spin_stux_ir_pause_stux -->|"H Keep spinning"| iran_jcpoa_2015_ahmadinejad_playing_live_ir_accept_jcpoa_ir_keep_spin_jcpoa
  iran_stuxnet_2010_ahmadinejad_playing_live_ir_keep_spin_stux_ir_pause_stux -->|"Pause"| iran_jcpoa_2015_ahmadinejad_playing_live_ir_accept_jcpoa_ir_keep_spin_jcpoa
  iran_jcpoa_2015_ahmadinejad_playing_live_ir_accept_jcpoa_ir_keep_spin_jcpoa -->|"H Accept the JCPOA =  rouhani"| iran_white_wednesdays_2017_rouhani_playing_live_ir_arrest_white_ir_let_post
  iran_jcpoa_2015_ahmadinejad_playing_live_ir_accept_jcpoa_ir_keep_spin_jcpoa -->|"Keep enriching =  rouhani"| iran_white_wednesdays_2017_rouhani_playing_live_ir_arrest_white_ir_let_post
  iran_white_wednesdays_2017_rouhani_playing_live_ir_arrest_white_ir_let_post -->|"H Arrest"| iran_archive_2018_rouhani_playing_live_ir_sprint_tonight_ir_wait_europe
  iran_white_wednesdays_2017_rouhani_playing_live_ir_arrest_white_ir_let_post -->|"Let them post"| iran_archive_2018_rouhani_playing_live_ir_sprint_tonight_ir_wait_europe
  iran_archive_2018_rouhani_playing_live_ir_sprint_tonight_ir_wait_europe -->|"H Stay in the JCPOA"| iran_bounce_2019_rouhani_playing_live_ir_keep_limits_ir_step_off
  iran_archive_2018_rouhani_playing_live_ir_sprint_tonight_ir_wait_europe -.->|"AL Sprint tonight"| iran_bounce_2019_rouhani_playing_live_ir_keep_limits_ir_step_off
  iran_bounce_2019_rouhani_playing_live_ir_keep_limits_ir_step_off -->|"H Start stepping off"| iran_hormuz_2019_rouhani_playing_live_ir_hold_fire_ir_squeeze
  iran_bounce_2019_rouhani_playing_live_ir_keep_limits_ir_step_off -.->|"AL Keep the limits anyway"| iran_bounce_2019_rouhani_ended_jcpoa_holds_
  iran_hormuz_2019_rouhani_playing_live_ir_hold_fire_ir_squeeze -->|"Hold fire"| iran_soleimani_2020_rouhani_playing_live_ir_eat_airport_ir_missiles_752
  iran_hormuz_2019_rouhani_playing_live_ir_hold_fire_ir_squeeze -->|"H Squeeze the Strait"| iran_soleimani_2020_rouhani_playing_live_ir_eat_airport_ir_missiles_752
  iran_soleimani_2020_rouhani_playing_live_ir_eat_airport_ir_missiles_752 -->|"H Missiles, then the airliner"| iran_abraham_2020_rouhani_playing_live_ir_drop_quds_ir_keep_quds
  iran_soleimani_2020_rouhani_playing_live_ir_eat_airport_ir_missiles_752 -->|"Eat it"| iran_abraham_2020_rouhani_playing_live_ir_drop_quds_ir_keep_quds
  iran_abraham_2020_rouhani_playing_live_ir_drop_quds_ir_keep_quds -->|"H Keep Death to Israel"| iran_unleave_2021_rouhani_playing_live_ir_sprint_unleave_ir_talk_unleave
  iran_abraham_2020_rouhani_playing_live_ir_drop_quds_ir_keep_quds -.->|"AL Drop Death to Israel"| iran_unleave_2021_rouhani_playing_live_ir_sprint_unleave_ir_talk_unleave
  iran_unleave_2021_rouhani_playing_live_ir_sprint_unleave_ir_talk_unleave -->|"H Sprint =  raisi"| iran_mahsa_2022_raisi_playing_live_ir_crush_mahsa_ir_fire_morality
  iran_unleave_2021_rouhani_playing_live_ir_sprint_unleave_ir_talk_unleave -->|"Talk =  raisi"| iran_mahsa_2022_raisi_playing_live_ir_crush_mahsa_ir_fire_morality
  iran_mahsa_2022_raisi_playing_live_ir_crush_mahsa_ir_fire_morality -->|"H Crush it"| iran_saudi_accord_2023_raisi_playing_live_ir_fund_hamas_ir_leave_hamas
  iran_mahsa_2022_raisi_playing_live_ir_crush_mahsa_ir_fire_morality -->|"Fire the morality police"| iran_saudi_accord_2023_raisi_playing_live_ir_fund_hamas_ir_leave_hamas
  iran_saudi_accord_2023_raisi_playing_live_ir_fund_hamas_ir_leave_hamas -->|"H Fund Hamas"| iran_oct7_2023_raisi_playing_live_ir_keep_layer_ir_shoot_now
  iran_saudi_accord_2023_raisi_playing_live_ir_fund_hamas_ir_leave_hamas -.->|"AL Do not fund Hamas"| iran_sit_pezeshkian_2024_raisi_playing_live_ir_sit_pezeshkian
  iran_oct7_2023_raisi_playing_live_ir_keep_layer_ir_shoot_now -->|"H Keep the proxy layer"| iran_direct_fire_2024_raisi_playing_live_ir_fire_iran_ir_stay_proxies
  iran_oct7_2023_raisi_playing_live_ir_keep_layer_ir_shoot_now -->|"Shoot from Iran now"| iran_direct_fire_2024_raisi_playing_live_ir_fire_iran_ir_stay_proxies
  iran_sit_pezeshkian_2024_raisi_playing_live_ir_sit_pezeshkian -->|"H Sit the presidency =  pezeshkian"| iran_twelve_days_2025_pezeshkian_playing_live_ir_absorb_strike_ir_deal_now
  iran_direct_fire_2024_raisi_playing_live_ir_fire_iran_ir_stay_proxies -->|"H Fire from Iran"| iran_sit_pezeshkian_2024_raisi_playing_live_ir_sit_pezeshkian
  iran_direct_fire_2024_raisi_playing_live_ir_fire_iran_ir_stay_proxies -->|"Stay with the proxies"| iran_sit_pezeshkian_2024_raisi_playing_live_ir_sit_pezeshkian
  iran_twelve_days_2025_pezeshkian_playing_live_ir_absorb_strike_ir_deal_now -->|"H Absorb and strike back"| iran_the_leader_2026_pezeshkian_playing_live_ir_hormuz_memo_ir_keep_war
  iran_twelve_days_2025_pezeshkian_playing_live_ir_absorb_strike_ir_deal_now -->|"Deal now"| iran_the_leader_2026_pezeshkian_playing_live_ir_hormuz_memo_ir_keep_war
  iran_the_leader_2026_pezeshkian_playing_live_ir_hormuz_memo_ir_keep_war -->|"H Squeeze Hormuz, then the memorandum"| iran_the_leader_2026_pezeshkian_ended_the_leader_
  iran_the_leader_2026_pezeshkian_playing_live_ir_hormuz_memo_ir_keep_war -->|"Keep the war"| iran_the_leader_2026_pezeshkian_ended_keep_the_war_
```

## US, 1953 to the cup

```mermaid
flowchart TB
  classDef play fill:#1c2333,stroke:#c4a35a,color:#f3ead8
  classDef grave fill:#3a1a1a,stroke:#c45c5c,color:#f3ead8
  classDef hold fill:#1a2e22,stroke:#5d9b6a,color:#f3ead8
  classDef collapse fill:#2a2433,stroke:#8a7bb8,color:#f3ead8
  classDef fork fill:#23333a,stroke:#6ab4c8,color:#f3ead8
  us_coup_1953_us_playing_live_us_back_shah_us_walk["1953 To Coup or Not to Coup / ike"]:::fork
  us_atoms_1957_us_playing_live_us_keep_fuel_us_let_enrich["1957 Atoms for Peace / ike"]:::collapse
  us_coup_1953_us_ended_satrap_1953_{{"1953 GRAVE It was not that simple"}}:::grave
  us_white_revolution_1963_us_playing_live_us_press_reform_us_send_tanks["1963 White Revolution / kennedy"]:::collapse
  us_sofa_1964_us_playing_live_us_skip_sofa_us_take_sofa["1964 Status of Forces: US troops out of Iranian courts / johnson"]:::collapse
  us_sit_nixon_1969_us_playing_live_us_sit_nixon["1969 Nixon takes office / nixon"]:::play
  us_weapons_1972_us_playing_live_us_blank_check_us_hinterland_first["1972 Twin pillars, blank check / nixon"]:::collapse
  us_pipeline_1975_us_playing_live_us_keep_selling_us_slow_pipeline["1975 Ford keeps selling American weapons / ford"]:::collapse
  us_revolution_1979_us_playing_live_us_admit_shah_us_keep_shah_out["1978–1979 The Shah's cancer, the square / carter"]:::collapse
  us_veil_1979_us_playing_live_us_statement_women_us_stay_out["March 1979 The Imam repeals Family Protection / carter"]:::collapse
  us_hostages_1979_us_playing_live_us_eagle_claw_us_keep_talking["November 1979 Students occupy the US embassy / carter"]:::fork
  us_eagle_claw_1980_us_playing_live_us_see_wreckage["April 1980 Eagle Claw crashes at Desert One / carter"]:::play
  us_you_him_fight_1980_us_playing_live_us_let_saddam_us_warn_saddam["Summer 1980 Let's you and him fight / carter"]:::collapse
  us_iran_iraq_1980_us_playing_live_us_no_tilt_us_tilt_iraq["September 1980 Iraq invades Iran / carter"]:::collapse
  us_election_1980_us_playing_live_us_hail_mary_us_run_again["November 1980 Carter runs for re-election / carter"]:::collapse
  us_inaugurated_1981_us_playing_live_us_sit_reagan["January 1981 Reagan takes the oath / reagan"]:::play
  us_tilt_1982_us_playing_live_us_cia_baghdad_us_stay_neutral["1982 Iran is winning. Reagan tilts to Iraq / reagan"]:::collapse
  us_lebanon_1983_us_playing_live_us_bring_home_us_hit_bekaa["1982–1983 Hezbollah bombs the Marines in Beirut / reagan"]:::collapse
  us_iran_contra_1985_us_playing_live_us_keep_embargo_us_sell_missiles["1985–1987 Iran-Contra: missiles for hostages / reagan"]:::collapse
  us_cup_1988_us_playing_live_us_call_mistake_us_own_shot["1988 Khomeini drinks the poison chalice / reagan"]:::collapse
  us_robe_1989_us_playing_live_us_no_note_us_note_robe["1989 Khomeini dies. Khamenei becomes Supreme Leader / bush41"]:::collapse
  us_kuwait_1990_us_playing_live_us_go_baghdad_us_stop_border["1990 Iraq invades Kuwait / bush41"]:::collapse
  us_dual_containment_1993_us_playing_live_us_name_both_us_pick_one["1993 Clinton contains Iraq and Iran together / clinton"]:::collapse
  us_khobar_1996_us_playing_live_us_no_strike_khobar_us_strike_khobar["1996 Khobar Towers: nineteen airmen dead / clinton"]:::collapse
  us_wall_1997_us_playing_live_us_offer_handshake_us_stay_wall["1997 Khatami offers a dialogue of civilizations / clinton"]:::collapse
  us_natanz_2002_us_playing_live_us_bin_fax_us_take_fax["2002 The Natanz enrichment plant is revealed / bush43"]:::collapse
  us_baghdad_2003_us_playing_live_us_stop_again_us_take_baghdad["2003 The United States takes Baghdad / bush43"]:::collapse
  us_myth_2005_us_playing_live_us_condemn_myth_us_ignore_myth["2005 Ahmadinejad calls the Holocaust a myth / bush43"]:::collapse
  us_green_2009_us_playing_live_us_not_own_green_us_own_green["2009 Iran's Green Movement / obama"]:::collapse
  us_stuxnet_2010_us_playing_live_us_bomb_natanz_us_worm_run["2010 Stuxnet: a worm in the centrifuges / obama"]:::collapse
  us_jcpoa_2015_us_playing_live_us_sign_jcpoa_us_walk_jcpoa["2015 JCPOA: Joint Comprehensive Plan of Action / obama"]:::collapse
  us_white_wednesdays_2017_us_playing_live_us_nothing_white_us_tweet_white["2017 Women post unveiled on White Wednesdays / trump"]:::collapse
  us_archive_2018_us_playing_live_us_leave_jcpoa_us_stay_jcpoa["2018 Mossad steals Iran's nuclear archive / trump"]:::collapse
  us_bounce_2019_us_playing_live_us_offer_back_us_watch_bounce["2019 Europe does not pay. Iran starts leaving the JCPOA limits / trump"]:::collapse
  us_hormuz_2019_us_playing_live_us_abort_us_bomb["2019 Iran shoots down a US drone over Hormuz / trump"]:::collapse
  us_soleimani_2020_us_playing_live_us_hold_soleimani_us_kill_soleimani["2020 A drone kills Qasem Soleimani / trump"]:::collapse
  us_abraham_2020_us_playing_live_us_broker_accords_us_skip_accords["2020 Abraham Accords: Arab states recognize Israel / trump"]:::collapse
  us_unleave_2021_us_playing_live_us_snap_in_us_talk_forever["2021 Biden tries to restore the JCPOA / biden"]:::collapse
  us_mahsa_2022_us_playing_live_us_own_mahsa_us_statement_mahsa["2022 Mahsa Amini. Woman, Life, Freedom / biden"]:::collapse
  us_saudi_accord_2023_us_playing_live_us_private_saudi_us_public_saudi["2023 Saudi Arabia talks to Israel / biden"]:::fork
  us_oct7_2023_us_playing_live_us_arm_israel_us_go_first["2023 Hamas attacks Israel / biden"]:::collapse
  us_sit_pezeshkian_2024_us_playing_live_us_sit_2024["2024 Raisi dies. Pezeshkian takes office / biden"]:::play
  us_direct_fire_2024_us_playing_live_us_help_shoot_us_stay_out_fire["2024 Iran fires missiles from Iranian soil / biden"]:::collapse
  us_twelve_days_2025_us_playing_live_us_hit_fordow_us_stay_twelve["2025 Twelve-Day War: the US bombs Fordow / trump"]:::collapse
  us_the_leader_2026_us_playing_live_us_kill_imam_us_stop_fordow["2026 The campaign kills Ali Khamenei / trump"]:::fork
  us_the_leader_2026_us_ended_the_leader_(["2026 The Leader is dead"]):::hold
  us_the_leader_2026_us_ended_none_(["2026 The plants are a crater. The Imam is not."]):::hold
  us_coup_1953_us_playing_live_us_back_shah_us_walk -->|"H Back the Shah (covert)"| us_atoms_1957_us_playing_live_us_keep_fuel_us_let_enrich
  us_coup_1953_us_playing_live_us_back_shah_us_walk -.->|"AL Walk away"| us_coup_1953_us_ended_satrap_1953_
  us_atoms_1957_us_playing_live_us_keep_fuel_us_let_enrich -->|"H Keep sending the fuel"| us_white_revolution_1963_us_playing_live_us_press_reform_us_send_tanks
  us_atoms_1957_us_playing_live_us_keep_fuel_us_let_enrich -->|"Let them run the fuel cycle"| us_white_revolution_1963_us_playing_live_us_press_reform_us_send_tanks
  us_white_revolution_1963_us_playing_live_us_press_reform_us_send_tanks -->|"H Press him to reform"| us_sofa_1964_us_playing_live_us_skip_sofa_us_take_sofa
  us_white_revolution_1963_us_playing_live_us_press_reform_us_send_tanks -->|"Send him tanks instead"| us_sofa_1964_us_playing_live_us_skip_sofa_us_take_sofa
  us_sofa_1964_us_playing_live_us_skip_sofa_us_take_sofa -->|"H Take the immunity"| us_sit_nixon_1969_us_playing_live_us_sit_nixon
  us_sofa_1964_us_playing_live_us_skip_sofa_us_take_sofa -.->|"AL Do not ask for the bill"| us_sit_nixon_1969_us_playing_live_us_sit_nixon
  us_sit_nixon_1969_us_playing_live_us_sit_nixon -->|"H Sit the presidency"| us_weapons_1972_us_playing_live_us_blank_check_us_hinterland_first
  us_weapons_1972_us_playing_live_us_blank_check_us_hinterland_first -->|"H Sign the blank check"| us_pipeline_1975_us_playing_live_us_keep_selling_us_slow_pipeline
  us_weapons_1972_us_playing_live_us_blank_check_us_hinterland_first -->|"Make him spend on the hinterland first"| us_pipeline_1975_us_playing_live_us_keep_selling_us_slow_pipeline
  us_pipeline_1975_us_playing_live_us_keep_selling_us_slow_pipeline -->|"H Keep selling"| us_revolution_1979_us_playing_live_us_admit_shah_us_keep_shah_out
  us_pipeline_1975_us_playing_live_us_keep_selling_us_slow_pipeline -.->|"AL Slow the pipeline"| us_revolution_1979_us_playing_live_us_admit_shah_us_keep_shah_out
  us_revolution_1979_us_playing_live_us_admit_shah_us_keep_shah_out -->|"H Let him in for treatment"| us_veil_1979_us_playing_live_us_statement_women_us_stay_out
  us_revolution_1979_us_playing_live_us_admit_shah_us_keep_shah_out -.->|"AL Keep him out"| us_veil_1979_us_playing_live_us_statement_women_us_stay_out
  us_veil_1979_us_playing_live_us_statement_women_us_stay_out -->|"Issue a statement"| us_hostages_1979_us_playing_live_us_eagle_claw_us_keep_talking
  us_veil_1979_us_playing_live_us_statement_women_us_stay_out -->|"H Stay out"| us_hostages_1979_us_playing_live_us_eagle_claw_us_keep_talking
  us_hostages_1979_us_playing_live_us_eagle_claw_us_keep_talking -->|"H Authorize a rescue"| us_eagle_claw_1980_us_playing_live_us_see_wreckage
  us_hostages_1979_us_playing_live_us_eagle_claw_us_keep_talking -.->|"AL Keep talking"| us_you_him_fight_1980_us_playing_live_us_let_saddam_us_warn_saddam
  us_eagle_claw_1980_us_playing_live_us_see_wreckage -->|"H The hostages are still inside"| us_you_him_fight_1980_us_playing_live_us_let_saddam_us_warn_saddam
  us_you_him_fight_1980_us_playing_live_us_let_saddam_us_warn_saddam -->|"H Stay out of the way"| us_iran_iraq_1980_us_playing_live_us_no_tilt_us_tilt_iraq
  us_you_him_fight_1980_us_playing_live_us_let_saddam_us_warn_saddam -.->|"AL Tell Saddam no"| us_iran_iraq_1980_us_playing_live_us_no_tilt_us_tilt_iraq
  us_iran_iraq_1980_us_playing_live_us_no_tilt_us_tilt_iraq -.->|"AL Tilt to Iraq"| us_election_1980_us_playing_live_us_hail_mary_us_run_again
  us_iran_iraq_1980_us_playing_live_us_no_tilt_us_tilt_iraq -->|"H Stay out of the war"| us_election_1980_us_playing_live_us_hail_mary_us_run_again
  us_election_1980_us_playing_live_us_hail_mary_us_run_again -->|"H Run again"| us_inaugurated_1981_us_playing_live_us_sit_reagan
  us_election_1980_us_playing_live_us_hail_mary_us_run_again -.->|"AL Throw a Hail Mary"| us_inaugurated_1981_us_playing_live_us_sit_reagan
  us_inaugurated_1981_us_playing_live_us_sit_reagan -->|"H Sit the presidency"| us_tilt_1982_us_playing_live_us_cia_baghdad_us_stay_neutral
  us_tilt_1982_us_playing_live_us_cia_baghdad_us_stay_neutral -->|"H Share the intel with Baghdad"| us_lebanon_1983_us_playing_live_us_bring_home_us_hit_bekaa
  us_tilt_1982_us_playing_live_us_cia_baghdad_us_stay_neutral -.->|"AL Stay out of the war"| us_lebanon_1983_us_playing_live_us_bring_home_us_hit_bekaa
  us_lebanon_1983_us_playing_live_us_bring_home_us_hit_bekaa -->|"H Bring them home"| us_iran_contra_1985_us_playing_live_us_keep_embargo_us_sell_missiles
  us_lebanon_1983_us_playing_live_us_bring_home_us_hit_bekaa -.->|"AL Stay and hit the Bekaa"| us_iran_contra_1985_us_playing_live_us_keep_embargo_us_sell_missiles
  us_iran_contra_1985_us_playing_live_us_keep_embargo_us_sell_missiles -->|"H Sell them the missiles"| us_cup_1988_us_playing_live_us_call_mistake_us_own_shot
  us_iran_contra_1985_us_playing_live_us_keep_embargo_us_sell_missiles -.->|"AL Keep the embargo"| us_cup_1988_us_playing_live_us_call_mistake_us_own_shot
  us_cup_1988_us_playing_live_us_call_mistake_us_own_shot -->|"H Call it a mistake"| us_robe_1989_us_playing_live_us_no_note_us_note_robe
  us_cup_1988_us_playing_live_us_call_mistake_us_own_shot -.->|"AL Own the shot"| us_robe_1989_us_playing_live_us_no_note_us_note_robe
  us_robe_1989_us_playing_live_us_no_note_us_note_robe -->|"H Send a note"| us_kuwait_1990_us_playing_live_us_go_baghdad_us_stop_border
  us_robe_1989_us_playing_live_us_no_note_us_note_robe -->|"Do not send a note"| us_kuwait_1990_us_playing_live_us_go_baghdad_us_stop_border
  us_kuwait_1990_us_playing_live_us_go_baghdad_us_stop_border -->|"H Stop at the border"| us_dual_containment_1993_us_playing_live_us_name_both_us_pick_one
  us_kuwait_1990_us_playing_live_us_go_baghdad_us_stop_border -.->|"AL Go to Baghdad"| us_dual_containment_1993_us_playing_live_us_name_both_us_pick_one
  us_dual_containment_1993_us_playing_live_us_name_both_us_pick_one -->|"H Name both as the problem"| us_khobar_1996_us_playing_live_us_no_strike_khobar_us_strike_khobar
  us_dual_containment_1993_us_playing_live_us_name_both_us_pick_one -->|"Pick one"| us_khobar_1996_us_playing_live_us_no_strike_khobar_us_strike_khobar
  us_khobar_1996_us_playing_live_us_no_strike_khobar_us_strike_khobar -->|"H Do not strike"| us_wall_1997_us_playing_live_us_offer_handshake_us_stay_wall
  us_khobar_1996_us_playing_live_us_no_strike_khobar_us_strike_khobar -.->|"AL Strike"| us_wall_1997_us_playing_live_us_offer_handshake_us_stay_wall
  us_wall_1997_us_playing_live_us_offer_handshake_us_stay_wall -->|"H Offer the handshake"| us_natanz_2002_us_playing_live_us_bin_fax_us_take_fax
  us_wall_1997_us_playing_live_us_offer_handshake_us_stay_wall -->|"Stay behind the wall"| us_natanz_2002_us_playing_live_us_bin_fax_us_take_fax
  us_natanz_2002_us_playing_live_us_bin_fax_us_take_fax -->|"H Bin the fax"| us_baghdad_2003_us_playing_live_us_stop_again_us_take_baghdad
  us_natanz_2002_us_playing_live_us_bin_fax_us_take_fax -.->|"AL Take the fax"| us_baghdad_2003_us_playing_live_us_stop_again_us_take_baghdad
  us_baghdad_2003_us_playing_live_us_stop_again_us_take_baghdad -->|"H Take Baghdad"| us_myth_2005_us_playing_live_us_condemn_myth_us_ignore_myth
  us_baghdad_2003_us_playing_live_us_stop_again_us_take_baghdad -->|"Stop at the border again"| us_myth_2005_us_playing_live_us_condemn_myth_us_ignore_myth
  us_myth_2005_us_playing_live_us_condemn_myth_us_ignore_myth -->|"H Condemn"| us_green_2009_us_playing_live_us_not_own_green_us_own_green
  us_myth_2005_us_playing_live_us_condemn_myth_us_ignore_myth -->|"Ignore"| us_green_2009_us_playing_live_us_not_own_green_us_own_green
  us_green_2009_us_playing_live_us_not_own_green_us_own_green -->|"H Do not own the street"| us_stuxnet_2010_us_playing_live_us_bomb_natanz_us_worm_run
  us_green_2009_us_playing_live_us_not_own_green_us_own_green -.->|"AL Own the street"| us_stuxnet_2010_us_playing_live_us_bomb_natanz_us_worm_run
  us_stuxnet_2010_us_playing_live_us_bomb_natanz_us_worm_run -->|"H Let the worm run"| us_jcpoa_2015_us_playing_live_us_sign_jcpoa_us_walk_jcpoa
  us_stuxnet_2010_us_playing_live_us_bomb_natanz_us_worm_run -.->|"AL Bomb instead"| us_jcpoa_2015_us_playing_live_us_sign_jcpoa_us_walk_jcpoa
  us_jcpoa_2015_us_playing_live_us_sign_jcpoa_us_walk_jcpoa -->|"H Sign the JCPOA"| us_white_wednesdays_2017_us_playing_live_us_nothing_white_us_tweet_white
  us_jcpoa_2015_us_playing_live_us_sign_jcpoa_us_walk_jcpoa -.->|"AL Walk away"| us_white_wednesdays_2017_us_playing_live_us_nothing_white_us_tweet_white
  us_white_wednesdays_2017_us_playing_live_us_nothing_white_us_tweet_white -->|"H Tweet"| us_archive_2018_us_playing_live_us_leave_jcpoa_us_stay_jcpoa
  us_white_wednesdays_2017_us_playing_live_us_nothing_white_us_tweet_white -->|"Do nothing"| us_archive_2018_us_playing_live_us_leave_jcpoa_us_stay_jcpoa
  us_archive_2018_us_playing_live_us_leave_jcpoa_us_stay_jcpoa -->|"H Leave the JCPOA"| us_bounce_2019_us_playing_live_us_offer_back_us_watch_bounce
  us_archive_2018_us_playing_live_us_leave_jcpoa_us_stay_jcpoa -.->|"AL Stay in the JCPOA"| us_bounce_2019_us_playing_live_us_offer_back_us_watch_bounce
  us_bounce_2019_us_playing_live_us_offer_back_us_watch_bounce -->|"H Watch"| us_hormuz_2019_us_playing_live_us_abort_us_bomb
  us_bounce_2019_us_playing_live_us_offer_back_us_watch_bounce -->|"Offer a ladder"| us_hormuz_2019_us_playing_live_us_abort_us_bomb
  us_hormuz_2019_us_playing_live_us_abort_us_bomb -->|"H Call it off"| us_soleimani_2020_us_playing_live_us_hold_soleimani_us_kill_soleimani
  us_hormuz_2019_us_playing_live_us_abort_us_bomb -->|"Take the shot"| us_soleimani_2020_us_playing_live_us_hold_soleimani_us_kill_soleimani
  us_soleimani_2020_us_playing_live_us_hold_soleimani_us_kill_soleimani -->|"H Kill him"| us_abraham_2020_us_playing_live_us_broker_accords_us_skip_accords
  us_soleimani_2020_us_playing_live_us_hold_soleimani_us_kill_soleimani -.->|"AL Hold the shot"| us_abraham_2020_us_playing_live_us_broker_accords_us_skip_accords
  us_abraham_2020_us_playing_live_us_broker_accords_us_skip_accords -->|"H Broker the Accords"| us_unleave_2021_us_playing_live_us_snap_in_us_talk_forever
  us_abraham_2020_us_playing_live_us_broker_accords_us_skip_accords -.->|"AL Leave the boycott in place"| us_unleave_2021_us_playing_live_us_snap_in_us_talk_forever
  us_unleave_2021_us_playing_live_us_snap_in_us_talk_forever -->|"H Talk forever"| us_mahsa_2022_us_playing_live_us_own_mahsa_us_statement_mahsa
  us_unleave_2021_us_playing_live_us_snap_in_us_talk_forever -.->|"AL Snap back in"| us_mahsa_2022_us_playing_live_us_own_mahsa_us_statement_mahsa
  us_mahsa_2022_us_playing_live_us_own_mahsa_us_statement_mahsa -->|"H Issue a statement"| us_saudi_accord_2023_us_playing_live_us_private_saudi_us_public_saudi
  us_mahsa_2022_us_playing_live_us_own_mahsa_us_statement_mahsa -.->|"AL Own the street"| us_saudi_accord_2023_us_playing_live_us_private_saudi_us_public_saudi
  us_saudi_accord_2023_us_playing_live_us_private_saudi_us_public_saudi -->|"H Do the talks in public"| us_oct7_2023_us_playing_live_us_arm_israel_us_go_first
  us_saudi_accord_2023_us_playing_live_us_private_saudi_us_public_saudi -.->|"AL Do the talks in private"| us_sit_pezeshkian_2024_us_playing_live_us_sit_2024
  us_oct7_2023_us_playing_live_us_arm_israel_us_go_first -->|"H Arm Israel"| us_direct_fire_2024_us_playing_live_us_help_shoot_us_stay_out_fire
  us_oct7_2023_us_playing_live_us_arm_israel_us_go_first -->|"Go first"| us_direct_fire_2024_us_playing_live_us_help_shoot_us_stay_out_fire
  us_sit_pezeshkian_2024_us_playing_live_us_sit_2024 -->|"H Note the crash"| us_twelve_days_2025_us_playing_live_us_hit_fordow_us_stay_twelve
  us_direct_fire_2024_us_playing_live_us_help_shoot_us_stay_out_fire -->|"H Help shoot them down"| us_sit_pezeshkian_2024_us_playing_live_us_sit_2024
  us_direct_fire_2024_us_playing_live_us_help_shoot_us_stay_out_fire -->|"Stay out"| us_sit_pezeshkian_2024_us_playing_live_us_sit_2024
  us_twelve_days_2025_us_playing_live_us_hit_fordow_us_stay_twelve -->|"H Hit Fordow"| us_the_leader_2026_us_playing_live_us_kill_imam_us_stop_fordow
  us_twelve_days_2025_us_playing_live_us_hit_fordow_us_stay_twelve -.->|"AL Stay out of Israel's war"| us_the_leader_2026_us_playing_live_us_kill_imam_us_stop_fordow
  us_the_leader_2026_us_playing_live_us_kill_imam_us_stop_fordow -->|"H Run the campaign"| us_the_leader_2026_us_ended_the_leader_
  us_the_leader_2026_us_playing_live_us_kill_imam_us_stop_fordow -.->|"AL Stop after Fordow"| us_the_leader_2026_us_ended_none_
```

## Iran, 1953 to the cup

Mossadegh can keep the chair by dealing with London. That costume runs through
Nixon, then 1979 still seats Bazargan. Nationalize is the golden path: you
become the Shah, then you leave, then you are the letterhead and the Imam has
the guns.

```mermaid
flowchart TB
  classDef play fill:#1c2333,stroke:#c4a35a,color:#f3ead8
  classDef grave fill:#3a1a1a,stroke:#c45c5c,color:#f3ead8
  classDef hold fill:#1a2e22,stroke:#5d9b6a,color:#f3ead8
  classDef collapse fill:#2a2433,stroke:#8a7bb8,color:#f3ead8
  classDef fork fill:#23333a,stroke:#6ab4c8,color:#f3ead8
  iran_coup_1953_mossadegh_playing_live_ir_deal_london_ir_deal_moscow_ir_nationalize["1953 Danger: Coup! / mossadegh"]:::fork
  iran_deposed_1953_shah_playing_live_ir_sit_throne["1953 You have been deposed / shah"]:::play
  iran_coup_1953_mossadegh_ended_mossadegh_street_{{"1953 GRAVE The street heard the lesson"}}:::grave
  iran_coup_1953_mossadegh_ended_mossadegh_falls_{{"1953 GRAVE It was not that simple"}}:::grave
  iran_atoms_1957_shah_playing_live_ir_shah_fuel_ir_shah_plant["1957 Atoms for Peace / shah"]:::collapse
  iran_white_revolution_1963_shah_playing_live_ir_keep_quiet_ir_white_rev["1963 White Revolution / shah"]:::collapse
  iran_sofa_1964_shah_playing_live_ir_pass_sofa_ir_refuse_sofa["1964 Status of Forces: US troops out of Iranian courts / shah"]:::collapse
  iran_sit_nixon_1969_shah_playing_live_ir_nixon_next["1969 Nixon takes office / shah"]:::play
  iran_weapons_1972_shah_playing_live_ir_buy_catalog_ir_spend_villages["1972 Twin pillars, blank check / shah"]:::collapse
  iran_pipeline_1975_shah_playing_live_ir_keep_catalog_ir_villages_again["1975 Ford keeps selling American weapons / shah"]:::fork
  iran_revolution_1979_shah_playing_live_ir_fire_crowd_ir_shah_leave["1978–1979 The Shah's cancer, the square / shah"]:::collapse
  iran_revolution_1979_shah_playing_live_ir_shah_hold_ir_shah_leave["1978–1979 The Shah's cancer, the square / shah"]:::fork
  iran_veil_1979_bazargan_playing_live_ir_keep_fpl_ir_repeal_fpl["March 1979 The Imam repeals Family Protection / bazargan"]:::collapse
  iran_revolution_1979_shah_ended_shah_holds_(["1978–1979 The king still sits"]):::hold
  iran_hostages_1979_bazargan_playing_live_ir_demand_leave_ir_let_students["November 1979 Students occupy the US embassy / bazargan"]:::collapse
  iran_resigned_1979_banisadr_playing_live_ir_refuse_letterhead_ir_sit_presidency["November 1979 Bazargan resigns / banisadr"]:::collapse
  iran_you_him_fight_1980_banisadr_playing_live_ir_watch_lineup["Summer 1980 Let's you and him fight / banisadr"]:::play
  iran_iran_iraq_1980_banisadr_playing_live_ir_artesh_war_ir_guards_war["September 1980 Iraq invades Iran / banisadr"]:::collapse
  iran_impeached_1981_banisadr_playing_live_ir_defy_majles_ir_leave_majles["June 1981 The Majlis impeaches Banisadr / banisadr"]:::collapse
  iran_seated_1981_khamenei_playing_live_ir_refuse_khamenei_ir_sit_khamenei["October 1981 Khamenei takes the presidency / khamenei"]:::collapse
  iran_lebanon_1983_khamenei_playing_live_ir_bekah_ir_no_export["1982–1983 Hezbollah bombs the Marines in Beirut / khamenei"]:::fork
  iran_iran_contra_1985_khamenei_playing_live_ir_refuse_crates_ir_take_parts["1985–1987 Iran-Contra: missiles for hostages / khamenei"]:::collapse
  iran_lebanon_1983_khamenei_ended_face_no_guns_{{"1982–1983 GRAVE The face does not have the guns"}}:::grave
  iran_cup_1988_khamenei_playing_live_ir_refuse_cup_ir_stamp_cup["1988 Khomeini drinks the poison chalice / khamenei"]:::fork
  iran_robe_1989_khamenei_playing_live_ir_remain_letterhead_ir_take_robe["1989 Khomeini dies. Khamenei becomes Supreme Leader / khamenei"]:::collapse
  iran_cup_1988_khamenei_ended_face_no_guns_{{"1988 GRAVE The face does not have the guns"}}:::grave
  iran_kuwait_1990_rafsanjani_playing_live_ir_side_saddam_ir_stay_out_kuwait["1990 Iraq invades Kuwait / rafsanjani"]:::fork
  iran_dual_containment_1993_rafsanjani_playing_live_ir_rebuild_ir_stay_loud["1993 Clinton contains Iraq and Iran together / rafsanjani"]:::collapse
  iran_kuwait_1990_rafsanjani_ended_kuwait_grave_{{"1990 GRAVE Suicide for a man who gassed you"}}:::grave
  iran_khobar_1996_rafsanjani_playing_live_ir_deny_khobar_ir_own_khobar["1996 Khobar Towers: nineteen airmen dead / rafsanjani"]:::collapse
  iran_wall_1997_rafsanjani_playing_live_ir_cnn_ir_meet_secretary["1997 Khatami offers a dialogue of civilizations / rafsanjani"]:::collapse
  iran_natanz_2002_khatami_playing_live_ir_keep_spinning_ir_pause_natanz["2002 The Natanz enrichment plant is revealed / khatami"]:::collapse
  iran_baghdad_2003_khatami_playing_live_ir_send_militias_ir_watch_baghdad["2003 The United States takes Baghdad / khatami"]:::collapse
  iran_myth_2005_khatami_playing_live_ir_dont_say_myth_ir_say_myth["2005 Ahmadinejad calls the Holocaust a myth / khatami"]:::collapse
  iran_green_2009_ahmadinejad_playing_live_ir_count_green_ir_crush_green["2009 Iran's Green Movement / ahmadinejad"]:::collapse
  iran_stuxnet_2010_ahmadinejad_playing_live_ir_keep_spin_stux_ir_pause_stux["2010 Stuxnet: a worm in the centrifuges / ahmadinejad"]:::collapse
  iran_jcpoa_2015_ahmadinejad_playing_live_ir_accept_jcpoa_ir_keep_spin_jcpoa["2015 JCPOA: Joint Comprehensive Plan of Action / ahmadinejad"]:::collapse
  iran_white_wednesdays_2017_rouhani_playing_live_ir_arrest_white_ir_let_post["2017 Women post unveiled on White Wednesdays / rouhani"]:::collapse
  iran_archive_2018_rouhani_playing_live_ir_sprint_tonight_ir_wait_europe["2018 Mossad steals Iran's nuclear archive / rouhani"]:::collapse
  iran_bounce_2019_rouhani_playing_live_ir_keep_limits_ir_step_off["2019 Europe does not pay. Iran starts leaving the JCPOA limits / rouhani"]:::fork
  iran_hormuz_2019_rouhani_playing_live_ir_hold_fire_ir_squeeze["2019 Iran shoots down a US drone over Hormuz / rouhani"]:::collapse
  iran_bounce_2019_rouhani_ended_jcpoa_holds_(["2019 You kept the limits"]):::hold
  iran_soleimani_2020_rouhani_playing_live_ir_eat_airport_ir_missiles_752["2020 A drone kills Qasem Soleimani / rouhani"]:::collapse
  iran_abraham_2020_rouhani_playing_live_ir_drop_quds_ir_keep_quds["2020 Abraham Accords: Arab states recognize Israel / rouhani"]:::collapse
  iran_unleave_2021_rouhani_playing_live_ir_sprint_unleave_ir_talk_unleave["2021 Biden tries to restore the JCPOA / rouhani"]:::collapse
  iran_mahsa_2022_raisi_playing_live_ir_crush_mahsa_ir_fire_morality["2022 Mahsa Amini. Woman, Life, Freedom / raisi"]:::collapse
  iran_saudi_accord_2023_raisi_playing_live_ir_fund_hamas_ir_leave_hamas["2023 Saudi Arabia talks to Israel / raisi"]:::fork
  iran_oct7_2023_raisi_playing_live_ir_keep_layer_ir_shoot_now["2023 Hamas attacks Israel / raisi"]:::collapse
  iran_sit_pezeshkian_2024_raisi_playing_live_ir_sit_pezeshkian["2024 Raisi dies. Pezeshkian takes office / raisi"]:::play
  iran_direct_fire_2024_raisi_playing_live_ir_fire_iran_ir_stay_proxies["2024 Iran fires missiles from Iranian soil / raisi"]:::collapse
  iran_twelve_days_2025_pezeshkian_playing_live_ir_absorb_strike_ir_deal_now["2025 Twelve-Day War: the US bombs Fordow / pezeshkian"]:::collapse
  iran_the_leader_2026_pezeshkian_playing_live_ir_hormuz_memo_ir_keep_war["2026 The campaign kills Ali Khamenei / pezeshkian"]:::fork
  iran_the_leader_2026_pezeshkian_ended_the_leader_(["2026 The Leader is dead"]):::hold
  iran_the_leader_2026_pezeshkian_ended_keep_the_war_{{"2026 GRAVE The Strait does not feed you"}}:::grave
  iran_coup_1953_mossadegh_playing_live_ir_deal_london_ir_deal_moscow_ir_nationalize -->|"H Nationalize and ride the crowd =  shah"| iran_deposed_1953_shah_playing_live_ir_sit_throne
  iran_coup_1953_mossadegh_playing_live_ir_deal_london_ir_deal_moscow_ir_nationalize -.->|"AL Hire the British engineers"| iran_coup_1953_mossadegh_ended_mossadegh_street_
  iran_coup_1953_mossadegh_playing_live_ir_deal_london_ir_deal_moscow_ir_nationalize -.->|"AL Cut a deal with Moscow"| iran_coup_1953_mossadegh_ended_mossadegh_falls_
  iran_deposed_1953_shah_playing_live_ir_sit_throne -->|"H Sit the throne"| iran_atoms_1957_shah_playing_live_ir_shah_fuel_ir_shah_plant
  iran_atoms_1957_shah_playing_live_ir_shah_fuel_ir_shah_plant -->|"H Take the American fuel"| iran_white_revolution_1963_shah_playing_live_ir_keep_quiet_ir_white_rev
  iran_atoms_1957_shah_playing_live_ir_shah_fuel_ir_shah_plant -->|"Talk about a national plant"| iran_white_revolution_1963_shah_playing_live_ir_keep_quiet_ir_white_rev
  iran_white_revolution_1963_shah_playing_live_ir_keep_quiet_ir_white_rev -->|"H Launch the White Revolution"| iran_sofa_1964_shah_playing_live_ir_pass_sofa_ir_refuse_sofa
  iran_white_revolution_1963_shah_playing_live_ir_keep_quiet_ir_white_rev -->|"Keep the landlords and the clergy quiet"| iran_sofa_1964_shah_playing_live_ir_pass_sofa_ir_refuse_sofa
  iran_sofa_1964_shah_playing_live_ir_pass_sofa_ir_refuse_sofa -->|"H Pass the bill"| iran_sit_nixon_1969_shah_playing_live_ir_nixon_next
  iran_sofa_1964_shah_playing_live_ir_pass_sofa_ir_refuse_sofa -.->|"AL Refuse Washington"| iran_sit_nixon_1969_shah_playing_live_ir_nixon_next
  iran_sit_nixon_1969_shah_playing_live_ir_nixon_next -->|"H Keep buying"| iran_weapons_1972_shah_playing_live_ir_buy_catalog_ir_spend_villages
  iran_weapons_1972_shah_playing_live_ir_buy_catalog_ir_spend_villages -->|"H Buy the American catalog"| iran_pipeline_1975_shah_playing_live_ir_keep_catalog_ir_villages_again
  iran_weapons_1972_shah_playing_live_ir_buy_catalog_ir_spend_villages -.->|"AL Spend the oil on the villages"| iran_pipeline_1975_shah_playing_live_ir_keep_catalog_ir_villages_again
  iran_pipeline_1975_shah_playing_live_ir_keep_catalog_ir_villages_again -->|"H Keep buying"| iran_revolution_1979_shah_playing_live_ir_fire_crowd_ir_shah_leave
  iran_pipeline_1975_shah_playing_live_ir_keep_catalog_ir_villages_again -->|"Spend on the villages"| iran_revolution_1979_shah_playing_live_ir_shah_hold_ir_shah_leave
  iran_revolution_1979_shah_playing_live_ir_fire_crowd_ir_shah_leave -->|"Fire on the crowd =  bazargan"| iran_veil_1979_bazargan_playing_live_ir_keep_fpl_ir_repeal_fpl
  iran_revolution_1979_shah_playing_live_ir_fire_crowd_ir_shah_leave -->|"H Leave =  bazargan"| iran_veil_1979_bazargan_playing_live_ir_keep_fpl_ir_repeal_fpl
  iran_revolution_1979_shah_playing_live_ir_shah_hold_ir_shah_leave -->|"H Leave =  bazargan"| iran_veil_1979_bazargan_playing_live_ir_keep_fpl_ir_repeal_fpl
  iran_revolution_1979_shah_playing_live_ir_shah_hold_ir_shah_leave -.->|"AL Stay. The villages are quiet."| iran_revolution_1979_shah_ended_shah_holds_
  iran_veil_1979_bazargan_playing_live_ir_keep_fpl_ir_repeal_fpl -.->|"AL Keep the Family Protection Law"| iran_hostages_1979_bazargan_playing_live_ir_demand_leave_ir_let_students
  iran_veil_1979_bazargan_playing_live_ir_keep_fpl_ir_repeal_fpl -->|"H Let the Imam repeal it"| iran_hostages_1979_bazargan_playing_live_ir_demand_leave_ir_let_students
  iran_hostages_1979_bazargan_playing_live_ir_demand_leave_ir_let_students -->|"H Demand they leave =  banisadr"| iran_resigned_1979_banisadr_playing_live_ir_refuse_letterhead_ir_sit_presidency
  iran_hostages_1979_bazargan_playing_live_ir_demand_leave_ir_let_students -.->|"AL Let the students hold it =  banisadr"| iran_resigned_1979_banisadr_playing_live_ir_refuse_letterhead_ir_sit_presidency
  iran_resigned_1979_banisadr_playing_live_ir_refuse_letterhead_ir_sit_presidency -->|"H Sit the presidency"| iran_you_him_fight_1980_banisadr_playing_live_ir_watch_lineup
  iran_resigned_1979_banisadr_playing_live_ir_refuse_letterhead_ir_sit_presidency -.->|"AL Refuse the letterhead"| iran_you_him_fight_1980_banisadr_playing_live_ir_watch_lineup
  iran_you_him_fight_1980_banisadr_playing_live_ir_watch_lineup -->|"H Watch the neighborhood line up"| iran_iran_iraq_1980_banisadr_playing_live_ir_artesh_war_ir_guards_war
  iran_iran_iraq_1980_banisadr_playing_live_ir_artesh_war_ir_guards_war -->|"H Let the Guards have the war"| iran_impeached_1981_banisadr_playing_live_ir_defy_majles_ir_leave_majles
  iran_iran_iraq_1980_banisadr_playing_live_ir_artesh_war_ir_guards_war -.->|"AL Keep the regular army in command"| iran_impeached_1981_banisadr_playing_live_ir_defy_majles_ir_leave_majles
  iran_impeached_1981_banisadr_playing_live_ir_defy_majles_ir_leave_majles -->|"H Leave the chair =  khamenei"| iran_seated_1981_khamenei_playing_live_ir_refuse_khamenei_ir_sit_khamenei
  iran_impeached_1981_banisadr_playing_live_ir_defy_majles_ir_leave_majles -.->|"AL Defy the Majlis =  khamenei"| iran_seated_1981_khamenei_playing_live_ir_refuse_khamenei_ir_sit_khamenei
  iran_seated_1981_khamenei_playing_live_ir_refuse_khamenei_ir_sit_khamenei -->|"H Sit the presidency"| iran_lebanon_1983_khamenei_playing_live_ir_bekah_ir_no_export
  iran_seated_1981_khamenei_playing_live_ir_refuse_khamenei_ir_sit_khamenei -.->|"AL Refuse the letterhead"| iran_lebanon_1983_khamenei_playing_live_ir_bekah_ir_no_export
  iran_lebanon_1983_khamenei_playing_live_ir_bekah_ir_no_export -->|"H Send the Guards to the Bekaa"| iran_iran_contra_1985_khamenei_playing_live_ir_refuse_crates_ir_take_parts
  iran_lebanon_1983_khamenei_playing_live_ir_bekah_ir_no_export -.->|"AL Keep the war at home"| iran_lebanon_1983_khamenei_ended_face_no_guns_
  iran_iran_contra_1985_khamenei_playing_live_ir_refuse_crates_ir_take_parts -->|"H Take the American parts"| iran_cup_1988_khamenei_playing_live_ir_refuse_cup_ir_stamp_cup
  iran_iran_contra_1985_khamenei_playing_live_ir_refuse_crates_ir_take_parts -.->|"AL Refuse the crates"| iran_cup_1988_khamenei_playing_live_ir_refuse_cup_ir_stamp_cup
  iran_cup_1988_khamenei_playing_live_ir_refuse_cup_ir_stamp_cup -->|"H Stamp the cup"| iran_robe_1989_khamenei_playing_live_ir_remain_letterhead_ir_take_robe
  iran_cup_1988_khamenei_playing_live_ir_refuse_cup_ir_stamp_cup -.->|"AL Refuse the ceasefire"| iran_cup_1988_khamenei_ended_face_no_guns_
  iran_robe_1989_khamenei_playing_live_ir_remain_letterhead_ir_take_robe -->|"H Take the robe =  rafsanjani"| iran_kuwait_1990_rafsanjani_playing_live_ir_side_saddam_ir_stay_out_kuwait
  iran_robe_1989_khamenei_playing_live_ir_remain_letterhead_ir_take_robe -->|"Remain president =  rafsanjani"| iran_kuwait_1990_rafsanjani_playing_live_ir_side_saddam_ir_stay_out_kuwait
  iran_kuwait_1990_rafsanjani_playing_live_ir_side_saddam_ir_stay_out_kuwait -->|"H Stay out"| iran_dual_containment_1993_rafsanjani_playing_live_ir_rebuild_ir_stay_loud
  iran_kuwait_1990_rafsanjani_playing_live_ir_side_saddam_ir_stay_out_kuwait -->|"Side with Saddam"| iran_kuwait_1990_rafsanjani_ended_kuwait_grave_
  iran_dual_containment_1993_rafsanjani_playing_live_ir_rebuild_ir_stay_loud -->|"H Rebuild"| iran_khobar_1996_rafsanjani_playing_live_ir_deny_khobar_ir_own_khobar
  iran_dual_containment_1993_rafsanjani_playing_live_ir_rebuild_ir_stay_loud -->|"Keep the revolution loud"| iran_khobar_1996_rafsanjani_playing_live_ir_deny_khobar_ir_own_khobar
  iran_khobar_1996_rafsanjani_playing_live_ir_deny_khobar_ir_own_khobar -->|"H Deny"| iran_wall_1997_rafsanjani_playing_live_ir_cnn_ir_meet_secretary
  iran_khobar_1996_rafsanjani_playing_live_ir_deny_khobar_ir_own_khobar -->|"Own it"| iran_wall_1997_rafsanjani_playing_live_ir_cnn_ir_meet_secretary
  iran_wall_1997_rafsanjani_playing_live_ir_cnn_ir_meet_secretary -->|"H Talk to the people =  khatami"| iran_natanz_2002_khatami_playing_live_ir_keep_spinning_ir_pause_natanz
  iran_wall_1997_rafsanjani_playing_live_ir_cnn_ir_meet_secretary -.->|"AL Meet the Secretary =  khatami"| iran_natanz_2002_khatami_playing_live_ir_keep_spinning_ir_pause_natanz
  iran_natanz_2002_khatami_playing_live_ir_keep_spinning_ir_pause_natanz -->|"H Keep spinning"| iran_baghdad_2003_khatami_playing_live_ir_send_militias_ir_watch_baghdad
  iran_natanz_2002_khatami_playing_live_ir_keep_spinning_ir_pause_natanz -.->|"AL Pause"| iran_baghdad_2003_khatami_playing_live_ir_send_militias_ir_watch_baghdad
  iran_baghdad_2003_khatami_playing_live_ir_send_militias_ir_watch_baghdad -->|"H Watch"| iran_myth_2005_khatami_playing_live_ir_dont_say_myth_ir_say_myth
  iran_baghdad_2003_khatami_playing_live_ir_send_militias_ir_watch_baghdad -->|"Send the militias now"| iran_myth_2005_khatami_playing_live_ir_dont_say_myth_ir_say_myth
  iran_myth_2005_khatami_playing_live_ir_dont_say_myth_ir_say_myth -->|"H Say it =  ahmadinejad"| iran_green_2009_ahmadinejad_playing_live_ir_count_green_ir_crush_green
  iran_myth_2005_khatami_playing_live_ir_dont_say_myth_ir_say_myth -->|"Do not say it =  ahmadinejad"| iran_green_2009_ahmadinejad_playing_live_ir_count_green_ir_crush_green
  iran_green_2009_ahmadinejad_playing_live_ir_count_green_ir_crush_green -->|"H Steal it and crush it"| iran_stuxnet_2010_ahmadinejad_playing_live_ir_keep_spin_stux_ir_pause_stux
  iran_green_2009_ahmadinejad_playing_live_ir_count_green_ir_crush_green -->|"Count the votes"| iran_stuxnet_2010_ahmadinejad_playing_live_ir_keep_spin_stux_ir_pause_stux
  iran_stuxnet_2010_ahmadinejad_playing_live_ir_keep_spin_stux_ir_pause_stux -->|"H Keep spinning"| iran_jcpoa_2015_ahmadinejad_playing_live_ir_accept_jcpoa_ir_keep_spin_jcpoa
  iran_stuxnet_2010_ahmadinejad_playing_live_ir_keep_spin_stux_ir_pause_stux -->|"Pause"| iran_jcpoa_2015_ahmadinejad_playing_live_ir_accept_jcpoa_ir_keep_spin_jcpoa
  iran_jcpoa_2015_ahmadinejad_playing_live_ir_accept_jcpoa_ir_keep_spin_jcpoa -->|"H Accept the JCPOA =  rouhani"| iran_white_wednesdays_2017_rouhani_playing_live_ir_arrest_white_ir_let_post
  iran_jcpoa_2015_ahmadinejad_playing_live_ir_accept_jcpoa_ir_keep_spin_jcpoa -->|"Keep enriching =  rouhani"| iran_white_wednesdays_2017_rouhani_playing_live_ir_arrest_white_ir_let_post
  iran_white_wednesdays_2017_rouhani_playing_live_ir_arrest_white_ir_let_post -->|"H Arrest"| iran_archive_2018_rouhani_playing_live_ir_sprint_tonight_ir_wait_europe
  iran_white_wednesdays_2017_rouhani_playing_live_ir_arrest_white_ir_let_post -->|"Let them post"| iran_archive_2018_rouhani_playing_live_ir_sprint_tonight_ir_wait_europe
  iran_archive_2018_rouhani_playing_live_ir_sprint_tonight_ir_wait_europe -->|"H Stay in the JCPOA"| iran_bounce_2019_rouhani_playing_live_ir_keep_limits_ir_step_off
  iran_archive_2018_rouhani_playing_live_ir_sprint_tonight_ir_wait_europe -.->|"AL Sprint tonight"| iran_bounce_2019_rouhani_playing_live_ir_keep_limits_ir_step_off
  iran_bounce_2019_rouhani_playing_live_ir_keep_limits_ir_step_off -->|"H Start stepping off"| iran_hormuz_2019_rouhani_playing_live_ir_hold_fire_ir_squeeze
  iran_bounce_2019_rouhani_playing_live_ir_keep_limits_ir_step_off -.->|"AL Keep the limits anyway"| iran_bounce_2019_rouhani_ended_jcpoa_holds_
  iran_hormuz_2019_rouhani_playing_live_ir_hold_fire_ir_squeeze -->|"Hold fire"| iran_soleimani_2020_rouhani_playing_live_ir_eat_airport_ir_missiles_752
  iran_hormuz_2019_rouhani_playing_live_ir_hold_fire_ir_squeeze -->|"H Squeeze the Strait"| iran_soleimani_2020_rouhani_playing_live_ir_eat_airport_ir_missiles_752
  iran_soleimani_2020_rouhani_playing_live_ir_eat_airport_ir_missiles_752 -->|"H Missiles, then the airliner"| iran_abraham_2020_rouhani_playing_live_ir_drop_quds_ir_keep_quds
  iran_soleimani_2020_rouhani_playing_live_ir_eat_airport_ir_missiles_752 -->|"Eat it"| iran_abraham_2020_rouhani_playing_live_ir_drop_quds_ir_keep_quds
  iran_abraham_2020_rouhani_playing_live_ir_drop_quds_ir_keep_quds -->|"H Keep Death to Israel"| iran_unleave_2021_rouhani_playing_live_ir_sprint_unleave_ir_talk_unleave
  iran_abraham_2020_rouhani_playing_live_ir_drop_quds_ir_keep_quds -.->|"AL Drop Death to Israel"| iran_unleave_2021_rouhani_playing_live_ir_sprint_unleave_ir_talk_unleave
  iran_unleave_2021_rouhani_playing_live_ir_sprint_unleave_ir_talk_unleave -->|"H Sprint =  raisi"| iran_mahsa_2022_raisi_playing_live_ir_crush_mahsa_ir_fire_morality
  iran_unleave_2021_rouhani_playing_live_ir_sprint_unleave_ir_talk_unleave -->|"Talk =  raisi"| iran_mahsa_2022_raisi_playing_live_ir_crush_mahsa_ir_fire_morality
  iran_mahsa_2022_raisi_playing_live_ir_crush_mahsa_ir_fire_morality -->|"H Crush it"| iran_saudi_accord_2023_raisi_playing_live_ir_fund_hamas_ir_leave_hamas
  iran_mahsa_2022_raisi_playing_live_ir_crush_mahsa_ir_fire_morality -->|"Fire the morality police"| iran_saudi_accord_2023_raisi_playing_live_ir_fund_hamas_ir_leave_hamas
  iran_saudi_accord_2023_raisi_playing_live_ir_fund_hamas_ir_leave_hamas -->|"H Fund Hamas"| iran_oct7_2023_raisi_playing_live_ir_keep_layer_ir_shoot_now
  iran_saudi_accord_2023_raisi_playing_live_ir_fund_hamas_ir_leave_hamas -.->|"AL Do not fund Hamas"| iran_sit_pezeshkian_2024_raisi_playing_live_ir_sit_pezeshkian
  iran_oct7_2023_raisi_playing_live_ir_keep_layer_ir_shoot_now -->|"H Keep the proxy layer"| iran_direct_fire_2024_raisi_playing_live_ir_fire_iran_ir_stay_proxies
  iran_oct7_2023_raisi_playing_live_ir_keep_layer_ir_shoot_now -->|"Shoot from Iran now"| iran_direct_fire_2024_raisi_playing_live_ir_fire_iran_ir_stay_proxies
  iran_sit_pezeshkian_2024_raisi_playing_live_ir_sit_pezeshkian -->|"H Sit the presidency =  pezeshkian"| iran_twelve_days_2025_pezeshkian_playing_live_ir_absorb_strike_ir_deal_now
  iran_direct_fire_2024_raisi_playing_live_ir_fire_iran_ir_stay_proxies -->|"H Fire from Iran"| iran_sit_pezeshkian_2024_raisi_playing_live_ir_sit_pezeshkian
  iran_direct_fire_2024_raisi_playing_live_ir_fire_iran_ir_stay_proxies -->|"Stay with the proxies"| iran_sit_pezeshkian_2024_raisi_playing_live_ir_sit_pezeshkian
  iran_twelve_days_2025_pezeshkian_playing_live_ir_absorb_strike_ir_deal_now -->|"H Absorb and strike back"| iran_the_leader_2026_pezeshkian_playing_live_ir_hormuz_memo_ir_keep_war
  iran_twelve_days_2025_pezeshkian_playing_live_ir_absorb_strike_ir_deal_now -->|"Deal now"| iran_the_leader_2026_pezeshkian_playing_live_ir_hormuz_memo_ir_keep_war
  iran_the_leader_2026_pezeshkian_playing_live_ir_hormuz_memo_ir_keep_war -->|"H Squeeze Hormuz, then the memorandum"| iran_the_leader_2026_pezeshkian_ended_the_leader_
  iran_the_leader_2026_pezeshkian_playing_live_ir_hormuz_memo_ir_keep_war -->|"Keep the war"| iran_the_leader_2026_pezeshkian_ended_keep_the_war_
```

## Live collapses (both buttons still playing, same next card)

| Chair | Year | Face | Card | Buttons | Lands on |
| --- | --- | --- | --- | --- | --- |
| us | 1957 | ike | Atoms for Peace | Keep sending the fuel / Let them run the fuel cycle | White Revolution (kennedy) |
| us | 1963 | kennedy | White Revolution | Press him to reform / Send him tanks instead | Status of Forces: US troops out of Iranian courts (johnson) |
| us | 1964 | johnson | Status of Forces: US troops out of Iranian courts | Take the immunity / Do not ask for the bill | Nixon takes office (nixon) |
| us | 1972 | nixon | Twin pillars, blank check | Sign the blank check / Make him spend on the hinterland first | Ford keeps selling American weapons (ford) |
| us | 1975 | ford | Ford keeps selling American weapons | Keep selling / Slow the pipeline | The Shah's cancer, the square (carter) |
| us | 1978–1979 | carter | The Shah's cancer, the square | Let him in for treatment / Keep him out | The Imam repeals Family Protection (carter) |
| us | March 1979 | carter | The Imam repeals Family Protection | Issue a statement / Stay out | Students occupy the US embassy (carter) |
| us | Summer 1980 | carter | Let's you and him fight | Stay out of the way / Tell Saddam no | Iraq invades Iran (carter) |
| us | September 1980 | carter | Iraq invades Iran | Tilt to Iraq / Stay out of the war | Carter runs for re-election (carter) |
| us | November 1980 | carter | Carter runs for re-election | Run again / Throw a Hail Mary | Reagan takes the oath (reagan) |
| us | 1982 | reagan | Iran is winning. Reagan tilts to Iraq | Share the intel with Baghdad / Stay out of the war | Hezbollah bombs the Marines in Beirut (reagan) |
| us | 1982–1983 | reagan | Hezbollah bombs the Marines in Beirut | Bring them home / Stay and hit the Bekaa | Iran-Contra: missiles for hostages (reagan) |
| us | 1985–1987 | reagan | Iran-Contra: missiles for hostages | Sell them the missiles / Keep the embargo | Khomeini drinks the poison chalice (reagan) |
| us | 1988 | reagan | Khomeini drinks the poison chalice | Call it a mistake / Own the shot | Khomeini dies. Khamenei becomes Supreme Leader (bush41) |
| us | 1989 | bush41 | Khomeini dies. Khamenei becomes Supreme Leader | Send a note / Do not send a note | Iraq invades Kuwait (bush41) |
| us | 1990 | bush41 | Iraq invades Kuwait | Stop at the border / Go to Baghdad | Clinton contains Iraq and Iran together (clinton) |
| us | 1993 | clinton | Clinton contains Iraq and Iran together | Name both as the problem / Pick one | Khobar Towers: nineteen airmen dead (clinton) |
| us | 1996 | clinton | Khobar Towers: nineteen airmen dead | Do not strike / Strike | Khatami offers a dialogue of civilizations (clinton) |
| us | 1997 | clinton | Khatami offers a dialogue of civilizations | Offer the handshake / Stay behind the wall | The Natanz enrichment plant is revealed (bush43) |
| us | 2002 | bush43 | The Natanz enrichment plant is revealed | Bin the fax / Take the fax | The United States takes Baghdad (bush43) |
| us | 2003 | bush43 | The United States takes Baghdad | Take Baghdad / Stop at the border again | Ahmadinejad calls the Holocaust a myth (bush43) |
| us | 2005 | bush43 | Ahmadinejad calls the Holocaust a myth | Condemn / Ignore | Iran's Green Movement (obama) |
| us | 2009 | obama | Iran's Green Movement | Do not own the street / Own the street | Stuxnet: a worm in the centrifuges (obama) |
| us | 2010 | obama | Stuxnet: a worm in the centrifuges | Let the worm run / Bomb instead | JCPOA: Joint Comprehensive Plan of Action (obama) |
| us | 2015 | obama | JCPOA: Joint Comprehensive Plan of Action | Sign the JCPOA / Walk away | Women post unveiled on White Wednesdays (trump) |
| us | 2017 | trump | Women post unveiled on White Wednesdays | Tweet / Do nothing | Mossad steals Iran's nuclear archive (trump) |
| us | 2018 | trump | Mossad steals Iran's nuclear archive | Leave the JCPOA / Stay in the JCPOA | Europe does not pay. Iran starts leaving the JCPOA limits (trump) |
| us | 2019 | trump | Europe does not pay. Iran starts leaving the JCPOA limits | Watch / Offer a ladder | Iran shoots down a US drone over Hormuz (trump) |
| us | 2019 | trump | Iran shoots down a US drone over Hormuz | Call it off / Take the shot | A drone kills Qasem Soleimani (trump) |
| us | 2020 | trump | A drone kills Qasem Soleimani | Kill him / Hold the shot | Abraham Accords: Arab states recognize Israel (trump) |
| us | 2020 | trump | Abraham Accords: Arab states recognize Israel | Broker the Accords / Leave the boycott in place | Biden tries to restore the JCPOA (biden) |
| us | 2021 | biden | Biden tries to restore the JCPOA | Talk forever / Snap back in | Mahsa Amini. Woman, Life, Freedom (biden) |
| us | 2022 | biden | Mahsa Amini. Woman, Life, Freedom | Issue a statement / Own the street | Saudi Arabia talks to Israel (biden) |
| us | 2023 | biden | Hamas attacks Israel | Arm Israel / Go first | Iran fires missiles from Iranian soil (biden) |
| us | 2024 | biden | Iran fires missiles from Iranian soil | Help shoot them down / Stay out | Raisi dies. Pezeshkian takes office (biden) |
| us | 2025 | trump | Twelve-Day War: the US bombs Fordow | Hit Fordow / Stay out of Israel's war | The campaign kills Ali Khamenei (trump) |
| iran | 1957 | shah | Atoms for Peace | Take the American fuel / Talk about a national plant | White Revolution (shah) |
| iran | 1963 | shah | White Revolution | Launch the White Revolution / Keep the landlords and the clergy quiet | Status of Forces: US troops out of Iranian courts (shah) |
| iran | 1964 | shah | Status of Forces: US troops out of Iranian courts | Pass the bill / Refuse Washington | Nixon takes office (shah) |
| iran | 1972 | shah | Twin pillars, blank check | Buy the American catalog / Spend the oil on the villages | Ford keeps selling American weapons (shah) |
| iran | 1978–1979 | shah | The Shah's cancer, the square | Fire on the crowd / Leave | The Imam repeals Family Protection (bazargan) |
| iran | March 1979 | bazargan | The Imam repeals Family Protection | Keep the Family Protection Law / Let the Imam repeal it | Students occupy the US embassy (bazargan) |
| iran | November 1979 | bazargan | Students occupy the US embassy | Demand they leave / Let the students hold it | Bazargan resigns (banisadr) |
| iran | November 1979 | banisadr | Bazargan resigns | Sit the presidency / Refuse the letterhead | Let's you and him fight (banisadr) |
| iran | September 1980 | banisadr | Iraq invades Iran | Let the Guards have the war / Keep the regular army in command | The Majlis impeaches Banisadr (banisadr) |
| iran | June 1981 | banisadr | The Majlis impeaches Banisadr | Leave the chair / Defy the Majlis | Khamenei takes the presidency (khamenei) |
| iran | October 1981 | khamenei | Khamenei takes the presidency | Sit the presidency / Refuse the letterhead | Hezbollah bombs the Marines in Beirut (khamenei) |
| iran | 1985–1987 | khamenei | Iran-Contra: missiles for hostages | Take the American parts / Refuse the crates | Khomeini drinks the poison chalice (khamenei) |
| iran | 1989 | khamenei | Khomeini dies. Khamenei becomes Supreme Leader | Take the robe / Remain president | Iraq invades Kuwait (rafsanjani) |
| iran | 1993 | rafsanjani | Clinton contains Iraq and Iran together | Rebuild / Keep the revolution loud | Khobar Towers: nineteen airmen dead (rafsanjani) |
| iran | 1996 | rafsanjani | Khobar Towers: nineteen airmen dead | Deny / Own it | Khatami offers a dialogue of civilizations (rafsanjani) |
| iran | 1997 | rafsanjani | Khatami offers a dialogue of civilizations | Talk to the people / Meet the Secretary | The Natanz enrichment plant is revealed (khatami) |
| iran | 2002 | khatami | The Natanz enrichment plant is revealed | Keep spinning / Pause | The United States takes Baghdad (khatami) |
| iran | 2003 | khatami | The United States takes Baghdad | Watch / Send the militias now | Ahmadinejad calls the Holocaust a myth (khatami) |
| iran | 2005 | khatami | Ahmadinejad calls the Holocaust a myth | Say it / Do not say it | Iran's Green Movement (ahmadinejad) |
| iran | 2009 | ahmadinejad | Iran's Green Movement | Steal it and crush it / Count the votes | Stuxnet: a worm in the centrifuges (ahmadinejad) |
| iran | 2010 | ahmadinejad | Stuxnet: a worm in the centrifuges | Keep spinning / Pause | JCPOA: Joint Comprehensive Plan of Action (ahmadinejad) |
| iran | 2015 | ahmadinejad | JCPOA: Joint Comprehensive Plan of Action | Accept the JCPOA / Keep enriching | Women post unveiled on White Wednesdays (rouhani) |
| iran | 2017 | rouhani | Women post unveiled on White Wednesdays | Arrest / Let them post | Mossad steals Iran's nuclear archive (rouhani) |
| iran | 2018 | rouhani | Mossad steals Iran's nuclear archive | Stay in the JCPOA / Sprint tonight | Europe does not pay. Iran starts leaving the JCPOA limits (rouhani) |
| iran | 2019 | rouhani | Iran shoots down a US drone over Hormuz | Hold fire / Squeeze the Strait | A drone kills Qasem Soleimani (rouhani) |
| iran | 2020 | rouhani | A drone kills Qasem Soleimani | Missiles, then the airliner / Eat it | Abraham Accords: Arab states recognize Israel (rouhani) |
| iran | 2020 | rouhani | Abraham Accords: Arab states recognize Israel | Keep Death to Israel / Drop Death to Israel | Biden tries to restore the JCPOA (rouhani) |
| iran | 2021 | rouhani | Biden tries to restore the JCPOA | Sprint / Talk | Mahsa Amini. Woman, Life, Freedom (raisi) |
| iran | 2022 | raisi | Mahsa Amini. Woman, Life, Freedom | Crush it / Fire the morality police | Saudi Arabia talks to Israel (raisi) |
| iran | 2023 | raisi | Hamas attacks Israel | Keep the proxy layer / Shoot from Iran now | Iran fires missiles from Iranian soil (raisi) |
| iran | 2024 | raisi | Iran fires missiles from Iranian soil | Fire from Iran / Stay with the proxies | Raisi dies. Pezeshkian takes office (raisi) |
| iran | 2025 | pezeshkian | Twelve-Day War: the US bombs Fordow | Absorb and strike back / Deal now | The campaign kills Ali Khamenei (pezeshkian) |

## Terminal collapses (both buttons end the chair the same way)

(none)

## Real forks (the two buttons do not land in the same place)

| Chair | Year | Face | Card | Destinations |
| --- | --- | --- | --- | --- |
| us | 1953 | ike | To Coup or Not to Coup | atoms-1957 ike playing, coup-1953 ike ended/satrap_1953 |
| us | November 1979 | carter | Students occupy the US embassy | eagle-claw-1980 carter playing, you-him-fight-1980 carter playing |
| us | 2023 | biden | Saudi Arabia talks to Israel | oct7-2023 biden playing, sit-pezeshkian-2024 biden playing |
| us | 2026 | trump | The campaign kills Ali Khamenei | the-leader-2026 trump ended/none, the-leader-2026 trump ended/the_leader |
| iran | 1953 | mossadegh | Danger: Coup! | coup-1953 mossadegh ended/mossadegh_falls, coup-1953 mossadegh ended/mossadegh_street, deposed-1953 shah playing |
| iran | 1975 | shah | Ford keeps selling American weapons | revolution-1979 shah playing, revolution-1979 shah playing |
| iran | 1978–1979 | shah | The Shah's cancer, the square | revolution-1979 shah ended/shah_holds, veil-1979 bazargan playing |
| iran | 1982–1983 | khamenei | Hezbollah bombs the Marines in Beirut | iran-contra-1985 khamenei playing, lebanon-1983 khamenei ended/face_no_guns |
| iran | 1988 | khamenei | Khomeini drinks the poison chalice | cup-1988 khamenei ended/face_no_guns, robe-1989 khamenei playing |
| iran | 1990 | rafsanjani | Iraq invades Kuwait | dual-containment-1993 rafsanjani playing, kuwait-1990 rafsanjani ended/kuwait_grave |
| iran | 2019 | rouhani | Europe does not pay. Iran starts leaving the JCPOA limits | bounce-2019 rouhani ended/jcpoa_holds, hormuz-2019 rouhani playing |
| iran | 2023 | raisi | Saudi Arabia talks to Israel | oct7-2023 raisi playing, sit-pezeshkian-2024 raisi playing |
| iran | 2026 | pezeshkian | The campaign kills Ali Khamenei | the-leader-2026 pezeshkian ended/keep_the_war, the-leader-2026 pezeshkian ended/the_leader |

## Graves (off-ramps)

| Chair | Year | Face | Button | Ending id | Title |
| --- | --- | --- | --- | --- | --- |
| us | 1953 | ike | Walk away | satrap_1953 | It was not that simple |
| iran | 1953 | mossadegh | Hire the British engineers | mossadegh_street | The street heard the lesson |
| iran | 1953 | mossadegh | Cut a deal with Moscow | mossadegh_falls | It was not that simple |
| iran | 1982–1983 | khamenei | Keep the war at home | face_no_guns | The face does not have the guns |
| iran | 1988 | khamenei | Refuse the ceasefire | face_no_guns | The face does not have the guns |
| iran | 1990 | rafsanjani | Side with Saddam | kuwait_grave | Suicide for a man who gassed you |
| iran | 2026 | pezeshkian | Keep the war | keep_the_war | The Strait does not feed you |

## What still needs plotting

These are the collapses that look like they should be forks. They are not
forks yet. Flags that get set and then ignored are called out in the copy.

| Card now | Later card | What the graph does | What to plot |
| --- | --- | --- | --- |
| weapons-1972 | iran-contra-1985 | Both catalog buttons land on Ford's 1975 pipeline. Contra still appears. The crates are a later collapse too. | If they never bought the American catalog, Reagan is not selling spare parts for a fleet that is not there. Skip the channel, or change what is in the crate. |
| weapons-1972 | revolution-1979 | Spend the oil on the villages sets hinterland_spent. 1979 Stay is a real hold. Leave still seats Bazargan. White Revolution still only moves liberals. | Shipped. Hinterland is the fork, not the feminists. Catalog still does not gate Contra. |
| revolution-1979 | hostages-1979 | Let him in and keep him out both ride to the veil, then the embassy. The shah_admitted flag is set and then ignored for routing. | Historically the seizure follows the admission. Keeping him out might skip the embassy card, or change who takes it. |
| hostages-1979 | iran-iraq-1980 | Authorize a rescue lands on Desert One, then you-and-him-fight. Keep talking skips the wreck and lands on you-and-him-fight. Both still reach Saddam. eagle_claw is flavor plus a tutorial card. | A burned wreck in Tabas is not a different 1980s. The result card explains what happened. The invasion still comes. |
| coup-1953 | revolution-1979 | Hire the British engineers is the street grave. Moscow is Stalin in a turban. There is no Mossadegh costume through Nixon. | Pruned. He is doomed even if Ike leaves him. The keep-the-chair path was a liberal fantasy. |
| lebanon-1983 | iran-contra-1985 | Bring them home and stay-and-hit both land on the channel. Iran's keep-the-war-at-home is a grave, not a skip. | No Bekaa, maybe no later hostages, maybe no TOW trade. Or the war still eats spare parts without Beirut. |

## How to regenerate

The dump walks `applyChoice`. The Python turns that JSON into this page.

Identity rule, from the dump: Nodes are chair + card + face + ending + live choice ids. Flags that change buttons (hinterland_spent) fork. Bars and clocks do not. A White Revolution that only moves liberals collapses.
