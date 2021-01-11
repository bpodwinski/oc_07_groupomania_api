import {
  AllowNull,
  Default,
  Unique,
  Length,
  IsEmail,
  IsUrl,
  ForeignKey,
  BelongsTo,
  HasMany,
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DataType,
} from "sequelize-typescript";

import { env } from "../utils/env";
import User from "./user";
import Comment from "./comment";

@Table({
  tableName: env.DB_PREFIX + "post",
})
export default class post extends Model<post> {
  @HasMany(() => Comment, { as: "comments" })
  comments!: Comment[];

  @BelongsTo(() => User, { onDelete: "CASCADE" }) user!: User;
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId!: number;

  @AllowNull(false)
  @Length({ min: 3, max: 128 })
  @Column
  title!: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT({ length: "long" }),
  })
  content!: string;

  @Column
  imgUrl!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
